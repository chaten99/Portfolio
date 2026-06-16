
const recentVisits = new Map();
const RATE_LIMIT_MS = 5000;
const MAX_MAP_SIZE = 500;


function cleanupRateLimitMap() {
  if (recentVisits.size < MAX_MAP_SIZE) return;
  const now = Date.now();
  for (const [ip, timestamp] of recentVisits) {
    if (now - timestamp > RATE_LIMIT_MS * 10) {
      recentVisits.delete(ip);
    }
  }
}


function parseBrowser(ua) {
  if (!ua) return { browser: "Unknown", version: "" };

  const browsers = [
    { name: "Edge", regex: /Edg(?:e|A|iOS)?\/(\S+)/ },
    { name: "Opera", regex: /(?:OPR|Opera)\/(\S+)/ },
    { name: "Samsung Browser", regex: /SamsungBrowser\/(\S+)/ },
    { name: "UC Browser", regex: /UCBrowser\/(\S+)/ },
    { name: "Firefox", regex: /Firefox\/(\S+)/ },
    { name: "Chrome", regex: /Chrome\/(\S+)/ },
    { name: "Safari", regex: /Version\/(\S+).*Safari/ },
  ];

  for (const { name, regex } of browsers) {
    const match = ua.match(regex);
    if (match) {
      return { browser: name, version: match[1] || "" };
    }
  }

  return { browser: "Other", version: "" };
}


function parseOS(ua) {
  if (!ua) return "Unknown";

  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows NT 6\.3/.test(ua)) return "Windows 8.1";
  if (/Windows NT 6\.2/.test(ua)) return "Windows 8";
  if (/Windows NT 6\.1/.test(ua)) return "Windows 7";
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/CrOS/.test(ua)) return "ChromeOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";

  return "Unknown";
}

function parseDevice(ua) {
  if (!ua) return { deviceType: "Unknown", deviceModel: "" };

  if (/iPad/.test(ua)) {
    return { deviceType: "Tablet", deviceModel: "iPad" };
  }
  if (/Tablet|PlayBook|Silk/.test(ua)) {
    return { deviceType: "Tablet", deviceModel: "" };
  }
  if (/Android/.test(ua) && !/Mobile/.test(ua)) {
    return { deviceType: "Tablet", deviceModel: extractAndroidModel(ua) };
  }
  if (/iPhone/.test(ua)) {
    return { deviceType: "Mobile", deviceModel: "iPhone" };
  }
  if (/iPod/.test(ua)) {
    return { deviceType: "Mobile", deviceModel: "iPod" };
  }
  if (/Android.*Mobile/.test(ua)) {
    return { deviceType: "Mobile", deviceModel: extractAndroidModel(ua) };
  }
  if (/Mobile|Opera Mini|IEMobile/.test(ua)) {
    return { deviceType: "Mobile", deviceModel: "" };
  }

  return { deviceType: "Desktop", deviceModel: "" };
}

function extractAndroidModel(ua) {
  const match = ua.match(/Android\s[\d.]+;\s*(.+?)\s*(?:Build|;|\))/);
  return match ? match[1].trim() : "";
}


async function getGeolocation(ip) {
  const fallback = { country: "Unknown", region: "Unknown", city: "Unknown" };

  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return fallback;
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,regionName,city`,
      { signal: AbortSignal.timeout(3000) }
    );

    if (!response.ok) return fallback;

    const data = await response.json();

    if (data.status !== "success") return fallback;

    return {
      country: data.country || "Unknown",
      region: data.regionName || "Unknown",
      city: data.city || "Unknown",
    };
  } catch {
    return fallback;
  }
}

export async function handler(event) {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };


  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      event.headers["client-ip"] ||
      "Unknown";

    cleanupRateLimitMap();
    const now = Date.now();
    const lastVisit = recentVisits.get(ip);

    if (lastVisit && now - lastVisit < RATE_LIMIT_MS) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Rate limited — visit already logged",
          cached: true,
        }),
      };
    }

    recentVisits.set(ip, now);

    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }

    const userAgent = event.headers["user-agent"] || "";
    const { browser, version } = parseBrowser(userAgent);
    const os = parseOS(userAgent);
    const { deviceType, deviceModel } = parseDevice(userAgent);

    const geo = await getGeolocation(ip);

    const payload = {
      timestamp: new Date().toISOString(),
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      browser,
      browserVersion: version,
      os,
      deviceType,
      deviceModel,
      page: body.page || "",
      referrer: body.referrer || "",
      screenWidth: body.screenWidth || "",
      screenHeight: body.screenHeight || "",
      language: body.language || "",
      timezone: body.timezone || "",
    };

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable is not set");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Server configuration error" }),
      };
    }

    const scriptResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000), // 8-second timeout
    });

    const scriptText = await scriptResponse.text();
    let scriptData;
    try {
      scriptData = JSON.parse(scriptText);
    } catch {
      scriptData = { status: "ok" };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        visitorCount: scriptData.totalRows || null,
      }),
    };
  } catch (error) {
    console.error("Track visit error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}

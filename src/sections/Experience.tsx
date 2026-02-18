import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type LayoutType = "desktop" | "mobile";

type ExperienceItemProps = {
  exp: Experience;
  idx: number;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
  layout: LayoutType;
};

const experiences: Experience[] = [
  {
    role: "BCA Student (2nd Year)",
    company: "CodeQuotient School of Technology",
    duration: "2024 – Present",
    description:
      "Pursuing BCA with specialization in AI. Focused on full-stack development, DSA, and real-time applications.",
  },
  {
    role: "Web Development Trainee",
    company: "CodeQuotient",
    duration: "2025",
    description:
      "Completed industrial training covering HTML, CSS, JavaScript, React, Node.js, MongoDB, and real-world projects.",
  },
  {
    role: "Senior Secondary (Science)",
    company: "DAV Centenary Public School",
    duration: "2023",
    description:
      "Completed 12th with Science stream, building strong analytical and problem-solving foundations.",
  },
];

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout,
}: ExperienceItemProps) {
  const progress = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1],
    { clamp: true }
  );

  const scale = useTransform(progress, [0, 0.25, 1], [0.75, 1, 1]);
  const opacity = useTransform(progress, [0, 0.2, 1], [0, 1, 1]);

  const y = useTransform(
    progress,
    [0, 1],
    [idx % 2 === 0 ? 60 : -60, 0]
  );

  const x = useTransform(progress, [0, 1], [-50, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/40"
          style={{ scale, opacity }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white/40 blur-md"
            style={{ opacity }}
          />
        </motion.div>

        <motion.div
          className={`absolute ${
            idx % 2 === 0 ? "-top-10" : "-bottom-10"
          } w-[3px] bg-gradient-to-b from-white/60 to-transparent`}
          style={{ height: 48, opacity }}
        />

        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-14" : "top-14"
          } w-[320px] max-w-[90vw] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-7 shadow-xl shadow-black/40 transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
          style={{ opacity, y }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.12 }}
        >
          <h3 className="text-xl font-semibold text-white">
            {exp.role}
          </h3>

          <p className="text-sm text-white/60 mt-1 mb-3 break-words">
            {exp.company} • {exp.duration}
          </p>

          <p className="text-sm text-white/75 leading-relaxed break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-400/40"
        style={{ scale, opacity }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white/40 blur-md"
          style={{ opacity }}
        />
      </motion.div>

      <motion.article
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-[90vw] max-w-sm ml-8 shadow-xl shadow-black/40"
        style={{ opacity, x }}
        transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.12 }}
      >
        <h3 className="text-lg font-semibold text-white break-words">
          {exp.role}
        </h3>

        <p className="text-sm text-white/60 mb-2 break-words">
          {exp.company} • {exp.duration}
        </p>

        <p className="text-sm text-white/75 leading-relaxed break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = (): void =>
      setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  const lineSize = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-bold mt-5 text-center tracking-tight">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-transparent rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={exp.role + idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-[6px] bg-gradient-to-b from-cyan-400 to-emerald-400 rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-12 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={exp.role + idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

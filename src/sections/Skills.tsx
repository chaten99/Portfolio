import { useEffect, useRef, useState, type JSX } from "react";
import { DiJavascript, DiNodejsSmall } from "react-icons/di";
import { FaGitAlt, FaGithub, FaReact } from "react-icons/fa6";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";
import { motion, useMotionValue } from "framer-motion";

type Skill = {
  icon: JSX.Element;
  name: string;
};

export default function Skills() {
  const skills: Skill[] = [
    { icon: <TbBrandCpp />, name: "C++" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <DiJavascript />, name: "JavaScript" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <FaGitAlt />, name: "Git" },
  ];

  const repeated: Skill[] = [...skills, ...skills];

  const [dir, setDir] = useState<number>(-1);
  const [active, setActive] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchY = useRef<number | null>(null);

  const x = useMotionValue<number>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e: WheelEvent) => {
      setDir(e.deltaY > 0 ? -1 : 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current === null) return;

      const currentY = e.touches[0]?.clientY ?? 0;
      const delta = currentY - touchY.current;

      setDir(delta > 0 ? 1 : -1);
      touchY.current = currentY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id: number;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dir * dt;

      const loop = (trackRef.current?.scrollWidth ?? 0) / 2;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1cd8d2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={`${s.name}-${i}`}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Software Development Intern",
    company: "CodeQuotient",
    duration: "Feb 2026 – Present",
    description:
      "Working on both frontend and backend architecture design, implementation, and optimization for projects.",
    highlights: [
      "Designed and implemented RESTful API endpoints using Node.js and Express.js, following MVC architecture and REST design principles",
      "Optimized PostgreSQL database schemas with indexing and normalization, reducing self-tested query times in personal backend projects",
      "Developed both frontend components and backend services for a full-stack project, applying best practices in React and Node.js across the stack",
    ],
  },
  {
    role: "Intern",
    company: "CodeQuotient",
    duration: "Aug 2025 – Oct 2025",
    description:
      "Focused on building robust server-side APIs, database design, and authentication systems.",
    highlights: [
      "Built RESTful API endpoints independently using Node.js and Express.js, following MVC architecture and REST design principles",
      "Designed and optimized PostgreSQL schemas with indexing and normalization, reducing self-tested query times in personal backend projects",
      "Developed a layered authentication system covering JWT, role-based authorization, and request validation middleware — applied across personal full-stack projects",
    ],
  },
  {
    role: "Summer Trainee",
    company: "CodeQuotient",
    duration: "Jul 2025 – Aug 2025",
    description:
      "Completed an intensive training program covering core JavaScript and foundational problem-solving skills.",
    highlights: [
      "Completed JavaScript projects independently — including a To-Do App, Stopwatch, and API Compiler — building proficiency in DOM manipulation and async programming",
      "Practiced DSA fundamentals daily, solving problems covering arrays, strings, and recursion to strengthen core problem-solving ability",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-black text-white overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-[0.06] blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-[0.05] blur-[140px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 md:px-10 lg:px-12">

        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1cd8d2] mb-3">
            Career Path
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Experience
          </h2>
          <div className="mt-4 mx-auto h-[3px] w-16 rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1cd8d2]/40 via-[#00bf8f]/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={exp.role + exp.duration}
                  className="relative flex items-start"
                >
                  <motion.div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] shadow-lg shadow-[#1cd8d2]/30" />
                    <div className="absolute w-8 h-8 rounded-full bg-[#1cd8d2]/15 animate-ping" />
                  </motion.div>

                  <motion.article
                    className={`relative ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -40 : 40,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 shadow-xl shadow-black/30 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.15]">
                      <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#1cd8d2] mb-4">
                        {exp.duration}
                      </span>

                      <h3 className="text-xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-white/60 mb-3">
                        {exp.company}
                      </p>

                      <p className="text-sm text-white/70 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2.5">
                        {exp.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-white/60"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

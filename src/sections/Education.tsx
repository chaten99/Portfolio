import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";

type EducationItem = {
  institution: string;
  degree: string;
  duration: string;
  description: string;
};

const educationList: EducationItem[] = [
  {
    institution: "CodeQuotient School of Technology",
    degree: "UG Program in Software Engineering",
    duration: "2024 – Present",
    description:
      "Pursuing an undergraduate program focused on full-stack development, data structures & algorithms, and modern software engineering practices.",
  },
  {
    institution: "Kurukshetra University",
    degree: "BCA (Artificial Intelligence)",
    duration: "2024 – Present",
    description:
      "Bachelor of Computer Applications with specialization in Artificial Intelligence, covering core CS fundamentals and emerging AI technologies.",
  },
  {
    institution: "D.A.V Centenary Public School",
    degree: "Senior Secondary (Class XII) – Science",
    duration: "2023",
    description:
      "Completed senior secondary education with Science stream, building strong analytical and problem-solving foundations.",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative bg-black text-white overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-[0.06] blur-[160px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-[0.05] blur-[140px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1cd8d2] mb-3">
            Academic Background
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Education
          </h2>
          <div className="mt-4 mx-auto h-[3px] w-16 rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {educationList.map((item, i) => (
            <motion.article
              key={item.institution}
              className="group relative rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-7 shadow-xl shadow-black/30 transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] opacity-60" />

              <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#00bf8f]/10 border border-[#1cd8d2]/20">
                <FaGraduationCap className="text-[#1cd8d2] text-xl" />
              </div>

              <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#1cd8d2] mb-4">
                {item.duration}
              </span>
              <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                {item.institution}
              </h3>

              <p className="text-sm font-medium text-white/70 mb-4">
                {item.degree}
              </p>

              <p className="text-sm text-white/55 leading-relaxed">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { FaTrophy, FaCertificate } from "react-icons/fa6";
import type { IconType } from "react-icons";

type Achievement = {
  title: string;
  event: string;
  description: string;
  Icon: IconType;
};
const achievements: Achievement[] = [
  {
    title: "Runner-Up",
    event: "CodeMasters 2025 Hackathon",
    description:
      "Ranked in the top out of all participating teams, solving algorithmic challenges without using built-in library functions under strict time pressure.",
    Icon: FaTrophy,
  },
  {
    title: "Industrial Training Program",
    event: "CodeQuotient Pvt. Ltd.",
    description:
      "Successfully completed a structured software engineering internship program covering full-stack development, backend systems, and professional engineering workflows.",
    Icon: FaCertificate,
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative bg-black text-white overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[380px] h-[380px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-[0.06] blur-[150px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-[0.05] blur-[130px] animate-pulse delay-500" />
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
            Highlights
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Achievements
          </h2>
          <div className="mt-4 mx-auto h-[3px] w-16 rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {achievements.map((item, i) => (
            <motion.article
              key={item.title}
              className="group relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1cd8d2]/30 via-[#00bf8f]/10 to-[#302b63]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-7 sm:p-8 shadow-xl shadow-black/30 transition-all duration-300 group-hover:bg-white/[0.07] group-hover:border-white/[0.15] h-full flex flex-col">
                <div className="relative mb-6">
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] opacity-20 blur-xl" />
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#00bf8f]/10 border border-[#1cd8d2]/25">
                    <item.Icon className="text-[#1cd8d2] text-2xl" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-sm font-medium text-[#1cd8d2]/80 mb-4">
                  {item.event}
                </p>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa6";

interface VisitorCounterProps {
  count: number | null;
  loading: boolean;
}

export default function VisitorCounter({
  count,
  loading,
}: VisitorCounterProps) {
  if (loading && count === null) return null;

  return (
    <motion.div
      id="visitor-counter"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="
        fixed bottom-6 left-6 z-50
        flex items-center gap-2
        px-4 py-2.5 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-xl shadow-black/40
        text-white text-sm font-medium
        select-none pointer-events-none
        max-[480px]:bottom-4 max-[480px]:left-4
        max-[480px]:px-3 max-[480px]:py-2 max-[480px]:text-xs
      "
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-white/10"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.15, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      <FaEye className="text-emerald-400 text-base max-[480px]:text-sm" />

      <span className="tracking-wide">
        Visitors:{" "}
        <span className="font-bold text-emerald-300">
          {count !== null ? count.toLocaleString() : "—"}
        </span>
      </span>
    </motion.div>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa6";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio: HTMLAudioElement | null = audioRef.current;
    if (!audio) return;

    const handleEnded = (): void => setPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async (): Promise<void> => {
    const audio: HTMLAudioElement | null = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  const handleDoubleClick = (): void => {
    const audio: HTMLAudioElement | null = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;

    if (playing) {
      void audio.play();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/iwasneverthere.mp3"
        preload="auto"
        loop
      />

      <motion.button
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        aria-label={playing ? "Pause music" : "Play music"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="
          fixed bottom-6 right-6 z-50
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-xl shadow-black/40
          text-white
          transition-all
        "
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-white/30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}

        {playing ? <FaPause /> : <FaPlay />}
      </motion.button>
    </>
  );
}

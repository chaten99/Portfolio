import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import w1 from "../assets/w1.png";
import w2 from "../assets/w2.png";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  review: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Mentor – CodeQuotient",
    role: "Full Stack Instructor",
    review:
      "Chaten is a highly dedicated BCA student with strong fundamentals in JavaScript and problem solving. His learning speed and consistency are impressive.",
    image: m1,
  },
  {
    name: "UI Review Team",
    role: "Design Feedback",
    review:
      "Chaten shows great potential in building modern web interfaces. His attention to detail and eagerness to improve stand out clearly.",
    image: w1,
  },
  {
    name: "Project Evaluator",
    role: "Academic Review",
    review:
      "For a second-year student, Chaten demonstrates excellent understanding of full-stack concepts and real-time application development.",
    image: m2,
  },
  {
    name: "Peer Collaboration",
    role: "Team Feedback",
    review:
      "Chaten is proactive, curious, and always ready to help teammates. He brings positive energy and strong technical growth mindset.",
    image: w2,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        What People Say About Chaten
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {testimonials.map((t, i) => (
          <motion.div
            key={`${t.name}-${i}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
              loading="lazy"
            />

            <p className="text-gray-200 italic mb-4">{t.review}</p>

            <h3 className="text-lg font-semibold">{t.name}</h3>

            <p className="text-sm text-gray-400">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

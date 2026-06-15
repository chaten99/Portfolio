import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

type Project = {
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  tech: string[];
  highlights: string[];
  github: string;
  demo: string;
  isLive: boolean;
};

const projects: Project[] = [
{
  title: "QuickTalk – Real-Time Chat Application",
  description:
    "A full-stack real-time messaging platform built with the MERN stack, featuring secure authentication, live user presence tracking, and seamless communication.",
  desktopImage: img1,
  mobileImage: photo1,
  tech: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Socket.IO",
    "Redis",
    "JWT",
    "OAuth 2.0",
    "Tailwind CSS"
  ],
  highlights: [
    "Real-time messaging with Socket.IO",
    "OTP, JWT, and OAuth-based authentication",
    "Live online/offline user presence",
    "Redis-powered session management",
    "Responsive and intuitive chat interface"
  ],
  github: "https://github.com/chaten99/Quick-Talk-A-Chat-App",
  demo: "",
  isLive: false,
},
  {
  title: "Doc-Sign – Digital Document Signing & Management",
  description:
    "A full-stack document management platform that streamlines document review, approval, and signing workflows with secure role-based access control.",
  desktopImage: img2,
  mobileImage: photo2,
  tech: [
    "React",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS"
  ],
  highlights: [
    "Role-based access control for Readers, Officers, and Admins",
    "End-to-end document review and signing workflow",
    "Admin dashboard with complete user and document management",
    "Secure document upload and status tracking",
    "Responsive and intuitive user experience"
  ],
  github: "https://github.com/chaten99/E-Sign",
  demo: "https://e-sign-chaten.netlify.app/",
  isLive: true,
},
  {
  title: "ShopVerse – E-Commerce Platform",
  description:
    "A full-stack e-commerce platform built with the MERN stack, featuring product discovery, cart management, and a seamless shopping experience.",
  desktopImage: img3,
  mobileImage: photo3,
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Zustand",
    "Tailwind CSS"
  ],
  highlights: [
    "Product browsing and search functionality",
    "Cart and order management system",
    "Global state management with Zustand",
    "Optimized backend APIs and database queries",
    "Responsive shopping experience across devices"
  ],
  github: "https://github.com/chaten99/E-Commerce",
  demo: "https://shop-verse-chaten.netlify.app/",
  isLive: true,
},
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute w-[340px] h-[340px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-[0.07] blur-[120px] animate-pulse ${
            reversed
              ? "top-1/4 right-0"
              : "top-1/4 left-0"
          }`}
        />
        <div
          className={`absolute w-[260px] h-[260px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-[0.05] blur-[100px] animate-pulse delay-700 ${
            reversed
              ? "bottom-0 left-10"
              : "bottom-0 right-10"
          }`}
        />
      </div>

      <div
        className={`relative z-10 flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-8 lg:gap-14`}
      >
        <motion.div
          className="relative w-full lg:w-[55%] group"
          initial={{ opacity: 0, x: reversed ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="absolute inset-0 -m-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(28,216,210,0.12), rgba(0,191,143,0.08), rgba(48,43,99,0.12), rgba(28,216,210,0.12))",
              filter: "blur(28px)",
            }}
          />

          <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/50">
            <picture className="block w-full">
              <source
                media="(max-width: 767px)"
                srcSet={project.mobileImage}
              />
              <motion.img
                src={project.desktopImage}
                alt={`${project.title} preview`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.03]" />
          </div>
        </motion.div>

        <motion.div
          className="relative w-full lg:w-[45%]"
          initial={{ opacity: 0, x: reversed ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="absolute -top-8 lg:-top-12 left-0 text-[5rem] lg:text-[7rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-b from-white/[0.06] to-transparent select-none pointer-events-none">
            {num}
          </span>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1cd8d2]">
                Project {num}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              {project.title}
            </h3>

            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-5 sm:p-6 mb-6 shadow-xl shadow-black/30">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#00bf8f] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.12] hover:border-white/[0.2]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub className="text-base" />
                Source Code
              </motion.a>

              {project.isLive ? (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] bg-[length:200%_100%] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-500 hover:bg-right"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Open ${project.title} live demo`}
                >
                  Live Demo
                  <FiExternalLink className="text-base" />
                </motion.a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/30 cursor-not-allowed select-none">
                  Coming Soon
                  <FiExternalLink className="text-base" />
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-black text-white overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-[0.06] blur-[160px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#1cd8d2] to-[#302b63] opacity-[0.05] blur-[140px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 md:py-28">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1cd8d2] mb-3">
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
            Projects
          </h2>
          <div className="mt-4 mx-auto h-[3px] w-16 rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]" />
          <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Full-stack applications built with performance, usability, and
            polished interfaces in mind.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

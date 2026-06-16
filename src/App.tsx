import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Achievements from "./sections/Achievements";
import Testimonials from "./sections/Testimonials";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import { useState } from "react";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";
import VisitorCounter from "./components/VisitorCounter";
import useVisitorTracking from "./hooks/useVisitorTracking";

export default function App() {
  const [introDone, setIntroDone] = useState<boolean>(false);
  const { visitorCount, loading } = useVisitorTracking();

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Testimonials />
          <Contact />
          <Footer />
          <MusicPlayer />
          <VisitorCounter count={visitorCount} loading={loading} />
        </div>
      )}
      </>
  );
}

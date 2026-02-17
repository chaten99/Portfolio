import { useEffect, useRef } from "react";

const colors = ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.5)"];

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;

    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;

    this.draw();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasEl: HTMLCanvasElement = canvas;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    const ctx: CanvasRenderingContext2D = context;

    const particleCount = 50;
    let particles: Particle[] = [];

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvasEl, ctx));
      }
    }

    function handleResize() {
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
      createParticles();
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId: number;

    function animate() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

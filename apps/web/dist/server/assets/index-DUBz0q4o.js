import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { a as cn } from "./router-CuoLvJMz.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@tanstack/react-router-with-query";
import "../server.js";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "react-hot-toast";
import "@supabase/ssr";
import "@base-ui/react/menu";
import "@base-ui/react/avatar";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/dialog";
import "@tabler/icons-react";
function createNoise3D() {
  return (x, y, z) => {
    const s1 = Math.sin(x * 1.37 + z * 0.21);
    const s2 = Math.sin(y * 1.13 - z * 0.29);
    const s3 = Math.sin((x + y + z) * 0.31);
    const c1 = Math.cos((x - y) * 0.47 + z * 0.17);
    return (s1 + s2 + s3 + c1) * 0.25;
  };
}
const Vortex = (props) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const baseHue = props.baseHue || 220;
  const rangeHue = props.rangeHue ?? 100;
  const noiseSteps = 3;
  const xOff = 125e-5;
  const yOff = 125e-5;
  const zOff = 5e-4;
  const backgroundColor = props.backgroundColor || "#000000";
  let tick = 0;
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(particlePropsLength);
  let center = [0, 0];
  const TAU = 2 * Math.PI;
  const rand = (n) => n * Math.random();
  const randRange = (n) => n - rand(2 * n);
  const fadeInOut = (t, m) => {
    const hm = 0.5 * m;
    return Math.abs((t + hm) % m - hm) / hm;
  };
  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;
  const setup = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resize(canvas);
    initParticles();
    draw(canvas, ctx);
  };
  const initParticles = () => {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };
  const initParticle = (i) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = rand(canvas.width);
    const y = center[1] + randRange(rangeY);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = baseTTL + rand(rangeTTL);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);
    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };
  const draw = (canvas, ctx) => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);
    window.requestAnimationFrame(() => draw(canvas, ctx));
  };
  const drawParticles = (ctx) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };
  const updateParticle = (i, ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const i2 = i + 1;
    const i3 = i + 2;
    const i4 = i + 3;
    const i5 = i + 4;
    const i6 = i + 5;
    const i7 = i + 6;
    const i8 = i + 7;
    const i9 = i + 8;
    const x = particleProps[i];
    const y = particleProps[i2];
    const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    const vx = lerp(particleProps[i3], Math.cos(n), 0.5);
    const vy = lerp(particleProps[i4], Math.sin(n), 0.5);
    const life = particleProps[i5];
    const ttl = particleProps[i6];
    const speed = particleProps[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const radius = particleProps[i8];
    const hue = particleProps[i9];
    drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);
    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life + 1;
    if (checkBounds(x, y, canvas) || life > ttl) {
      initParticle(i);
    }
  };
  const drawParticle = (x, y, x2, y2, life, ttl, radius, hue, ctx) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };
  const checkBounds = (x, y, canvas) => x > canvas.width || x < 0 || y > canvas.height || y < 0;
  const resize = (canvas) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
  };
  const renderGlow = (canvas, ctx) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };
  const renderToScreen = (canvas, ctx) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };
  useEffect(() => {
    setup();
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      resize(canvas);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("relative h-full w-full overflow-hidden", props.containerClassName),
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            ref: containerRef,
            className: "absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent",
            children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block h-full w-full" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-10", props.className), children: props.children })
      ]
    }
  );
};
function Home() {
  return /* @__PURE__ */ jsx("section", { className: "flex min-h-[calc(100dvh-4rem)] flex-col", children: /* @__PURE__ */ jsx(Vortex, { containerClassName: "relative min-h-[calc(100dvh-8rem)] flex-1", className: "flex h-full w-full items-start justify-center pt-14 sm:pt-20 lg:pt-24", backgroundColor: "transparent", baseHue: 176, rangeHue: 24, rangeY: 120, particleCount: 760, rangeRadius: 2.2, children: /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-8", children: /* @__PURE__ */ jsxs("h2", { className: "relative z-20 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl", children: [
    "Bem-vindo ao",
    " ",
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_hsl(var(--primary)_/_0.14))]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary via-ring to-primary [text-shadow:0_0_rgba(0,0,0,0.1)]", children: /* @__PURE__ */ jsx("span", { children: "Nullspace." }) }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary via-ring to-primary py-4", children: /* @__PURE__ */ jsx("span", { children: "Nullspace." }) })
    ] })
  ] }) }) }) });
}
export {
  Home as component
};

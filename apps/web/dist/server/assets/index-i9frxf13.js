import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as cn } from "./router-BXSAFwtv.js";
import { motion, AnimatePresence } from "motion/react";
import React__default, { useRef, useState, useEffect } from "react";
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
import "zod";
const BackgroundBeamsWithCollision = ({
  children,
  className
}) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);
  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6"
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20"
    },
    {
      initialX: 1e3,
      translateX: 1e3,
      duration: 4,
      repeatDelay: 2,
      className: "h-12"
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: parentRef,
      className: cn(
        "h-full bg-transparent relative flex items-center w-full justify-center overflow-hidden",
        className
      ),
      children: [
        beams.map((beam) => /* @__PURE__ */ jsx(
          CollisionMechanism,
          {
            beamOptions: beam,
            containerRef,
            parentRef
          },
          beam.initialX + "beam-idx"
        )),
        children,
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: containerRef,
            className: "absolute bottom-0 h-px w-full inset-x-0 pointer-events-none"
          }
        )
      ]
    }
  );
};
const CollisionMechanism = React__default.forwardRef(({ parentRef, containerRef, beamOptions = {} }, _ref) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  useEffect(() => {
    const checkCollision = () => {
      if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;
          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY
            }
          });
          setCycleCollisionDetected(true);
        }
      }
    };
    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);
  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2e3);
      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2e3);
    }
  }, [collision]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: beamRef,
        animate: "animate",
        initial: {
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0
        },
        variants: {
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0
          }
        },
        transition: {
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0
        },
        className: cn(
          "absolute left-0 top-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-primary via-ring to-transparent",
          beamOptions.className
        )
      },
      beamKey
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: collision.detected && collision.coordinates && /* @__PURE__ */ jsx(
      Explosion,
      {
        className: "",
        style: {
          left: `${collision.coordinates.x}px`,
          top: `${collision.coordinates.y}px`,
          transform: "translate(-50%, -50%)"
        }
      },
      `${collision.coordinates.x}-${collision.coordinates.y}`
    ) })
  ] });
});
CollisionMechanism.displayName = "CollisionMechanism";
const Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10)
  }));
  return /* @__PURE__ */ jsxs("div", { ...props, className: cn("absolute z-50 h-2 w-2", props.className), children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1.5, ease: "easeOut" },
        className: "absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent blur-sm"
      }
    ),
    spans.map((span) => /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { x: span.initialX, y: span.initialY, opacity: 1 },
        animate: {
          x: span.directionX,
          y: span.directionY,
          opacity: 0
        },
        transition: { duration: Math.random() * 1.5 + 0.5, ease: "easeOut" },
        className: "absolute h-1 w-1 rounded-full bg-gradient-to-b from-primary to-ring"
      },
      span.id
    ))
  ] });
};
function Home() {
  return /* @__PURE__ */ jsx(BackgroundBeamsWithCollision, { className: "relative min-h-[calc(100dvh-4rem)] lg:min-h-dvh", children: /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-8", children: /* @__PURE__ */ jsxs("h2", { className: "relative z-20 text-center font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl", children: [
    "Bem-vindo ao",
    " ",
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_hsl(var(--primary)_/_0.14))]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary via-ring to-primary [text-shadow:0_0_rgba(0,0,0,0.1)]", children: /* @__PURE__ */ jsx("span", { children: "Nullspace." }) }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-primary via-ring to-primary py-4", children: /* @__PURE__ */ jsx("span", { children: "Nullspace." }) })
    ] })
  ] }) }) });
}
export {
  Home as component
};

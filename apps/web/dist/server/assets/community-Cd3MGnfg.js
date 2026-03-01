import { jsxs, jsx } from "react/jsx-runtime";
import { a as cn } from "./router-BXSAFwtv.js";
import { useAnimate, useInView, stagger, motion } from "motion/react";
import { useEffect } from "react";
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
const TypewriterEffect = ({
  words,
  className,
  cursorClassName
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split("")
    };
  });
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content"
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut"
        }
      );
    }
  }, [isInView, animate]);
  const renderWords = () => {
    return /* @__PURE__ */ jsx(motion.div, { ref: scope, className: "inline", children: wordsArray.map((word, idx) => {
      return /* @__PURE__ */ jsxs("div", { className: "inline-block", children: [
        word.text.map((char, index) => /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: {},
            className: cn("text-white opacity-0 hidden", word.className),
            children: char
          },
          `char-${index}`
        )),
        " "
      ] }, `word-${idx}`);
    }) });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "text-center text-xl font-bold sm:text-2xl md:text-4xl lg:text-5xl",
        className
      ),
      children: [
        renderWords(),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            },
            className: cn(
              "inline-block h-5 w-[4px] rounded-sm bg-primary md:h-7 lg:h-10",
              cursorClassName
            )
          }
        )
      ]
    }
  );
};
function RouteComponent() {
  const words = [{
    text: "Desenvolvedores"
  }, {
    text: "não"
  }, {
    text: "evoluem"
  }, {
    text: "sozinhos."
  }, {
    text: "Evoluem"
  }, {
    text: "em"
  }, {
    text: "comunidade.",
    className: "text-primary"
  }];
  return /* @__PURE__ */ jsx("section", { className: "flex min-h-[calc(100dvh-8rem)] items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-5xl flex-col items-center justify-center p-6 text-center sm:p-10", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-8 text-sm text-white/80 sm:text-base", children: "Código melhor, carreira mais forte e networking real entre desenvolvedores." }),
    /* @__PURE__ */ jsx(TypewriterEffect, { words }),
    /* @__PURE__ */ jsx("a", { href: "https://chat.whatsapp.com/GIrZlmjoAOqHMYeodJAcQs?mode=gi_t", target: "_blank", rel: "noreferrer", className: "mt-10 inline-flex h-11 min-w-56 items-center justify-center rounded-xl border border-primary/60 bg-primary/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary/30", children: "Faça parte da comunidade" })
  ] }) });
}
export {
  RouteComponent as component
};

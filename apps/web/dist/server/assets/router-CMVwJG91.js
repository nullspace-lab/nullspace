import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { QueryClient } from "@tanstack/react-query";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, useRouterState, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { Menu } from "@base-ui/react/menu";
import { Avatar } from "@base-ui/react/avatar";
import { ChevronUp, LogOut, X, Home, Users, LogIn, Menu as Menu$1 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Dialog } from "@base-ui/react/dialog";
import { IconBrandGithub, IconBrandGoogle, IconBrandLinkedin } from "@tabler/icons-react";
import { z } from "zod";
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-CLtGygNK.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const AuthContext = createContext(void 0);
const supabase = createBrowserClient(
  "https://jgfkbdopjseuwtjzkfxv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZmtiZG9wanNldXd0anprZnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2Nzc4NzcsImV4cCI6MjA4NzI1Mzg3N30.yrfJ5H1PqJFPr-e0505wwGS-DNKArna-TMvicIZBG0I"
);
function AuthProvider({
  children,
  initialUser
}) {
  const [authEvent, setAuthEvent] = useState();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(initialUser ?? null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return;
      setSession(data.session);
      setUser(data.session.user);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session2) => {
      setAuthEvent(event);
      if (event === "SIGNED_OUT") {
        setSession(null);
        setUser(null);
        return;
      }
      if (session2) {
        setSession(session2);
        setUser(session2.user);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const signIn = async (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signInWithGithub = async (redirectTo) => supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectTo ?? window.location.origin,
      scopes: "read:user user:email"
    }
  });
  const signOut = async () => {
    setSession(null);
    setUser(null);
    return supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        session,
        signIn,
        signInWithGithub,
        signOut,
        user,
        authEvent
      },
      children
    }
  );
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function SignupDialog({
  open,
  onOpenChange
}) {
  const { signInWithGithub } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const handleGithubSignIn = async () => {
    setIsRedirecting(true);
    const redirectTo = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    const { error } = await signInWithGithub(redirectTo);
    if (error) {
      setIsRedirecting(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
    /* @__PURE__ */ jsx(Dialog.Backdrop, { className: "fixed inset-0 bg-slate-950/45 transition-opacity" }),
    /* @__PURE__ */ jsxs(Dialog.Popup, { className: "fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900/14 p-5 backdrop-blur-lg sm:p-6", children: [
      /* @__PURE__ */ jsx(Dialog.Title, { className: "mb-4 border-b border-white/8 pb-4 text-center text-lg font-semibold text-white", children: "Entrar com" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleGithubSignIn,
            disabled: isRedirecting,
            className: "group relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-slate-900/12 px-4 font-medium text-white transition-colors duration-200 hover:border-ring/70 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-70",
            children: [
              /* @__PURE__ */ jsx(IconBrandGithub, { className: "h-6 w-6 text-neutral-300" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-neutral-300", children: isRedirecting ? "Redirecionando..." : "GitHub" }),
              !isRedirecting ? /* @__PURE__ */ jsx(BottomGradient, {}) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            disabled: true,
            className: "flex h-10 w-full cursor-not-allowed items-center gap-2 rounded-lg border border-white/8 bg-slate-900/10 px-4 font-medium text-neutral-400 opacity-50",
            children: [
              /* @__PURE__ */ jsx(IconBrandGoogle, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Google" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            disabled: true,
            className: "flex h-10 w-full cursor-not-allowed items-center gap-2 rounded-lg border border-white/8 bg-slate-900/10 px-4 font-medium text-neutral-400 opacity-50",
            children: [
              /* @__PURE__ */ jsx(IconBrandLinkedin, { className: "h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "LinkedIn" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function BottomGradient() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_20px_hsl(var(--ring)_/_0.6)] transition-opacity duration-300 group-hover:opacity-100" }),
    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-x-0 -bottom-px h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-x-8 -bottom-px mx-auto h-[2px] w-2/3 bg-gradient-to-r from-transparent via-ring to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" })
  ] });
}
function Sidebar({ open, onOpenChange }) {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const { user, signOut } = useAuth();
  const closeSidebar = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": "Fechar menu",
        className: cn(
          "fixed inset-0 z-40 bg-slate-950/35 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        ),
        onClick: closeSidebar
      }
    ),
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-white/8 bg-slate-900/12 backdrop-blur-xl transform transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:w-64 lg:max-w-none lg:translate-x-0",
          {
            "translate-x-0": open,
            "-translate-x-full": !open
          }
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/8 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex min-w-0 items-center gap-3", children: /* @__PURE__ */ jsx(Link, { to: "/", onClick: closeSidebar, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/brand/nullspace-logo.svg",
                alt: "Nullspace Logo",
                className: "h-8 w-auto"
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              user && /* @__PURE__ */ jsxs(Menu.Root, { children: [
                /* @__PURE__ */ jsx(Menu.Trigger, { children: /* @__PURE__ */ jsx("button", { className: "inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-600 align-middle text-base font-medium text-white select-none hover:bg-slate-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary", children: /* @__PURE__ */ jsxs(Avatar.Root, { className: "size-full", children: [
                  /* @__PURE__ */ jsx(
                    Avatar.Image,
                    {
                      src: user?.user_metadata?.avatar_url,
                      width: "48",
                      height: "48",
                      className: "size-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Avatar.Fallback,
                    {
                      className: "flex size-full items-center justify-center text-base",
                      delay: 300,
                      children: /* @__PURE__ */ jsx("span", { children: user ? user?.email?.charAt(0).toUpperCase() || "U" : null })
                    }
                  )
                ] }) }) }),
                /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, { className: "z-50 outline-none", sideOffset: 8, children: /* @__PURE__ */ jsxs(Menu.Popup, { className: "origin-[var(--transform-origin)] min-w-[220px] rounded-xl border border-white/10 bg-slate-900/14 py-3 text-white backdrop-blur-lg transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0", children: [
                  /* @__PURE__ */ jsx(Menu.Arrow, { className: "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180", children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-5 w-5 text-white/20" }) }),
                  /* @__PURE__ */ jsx("div", { className: "border-b border-white/8 px-4 py-3", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-white/90", children: user?.email }) }),
                  /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: signOut,
                      className: "mx-2 flex w-[calc(100%-1rem)] select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm leading-5 text-white/90 outline-none transition-colors duration-150 data-[highlighted]:bg-white/8 data-[highlighted]:text-white",
                      children: [
                        /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsx("span", { children: "Sair" })
                      ]
                    }
                  ) })
                ] }) }) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "inline-flex size-10 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden",
                  onClick: closeSidebar,
                  "aria-label": "Fechar menu lateral",
                  children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "flex-1 overflow-y-auto px-4 py-3", children: [
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 border-t border-white/8 pt-4", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/",
                  activeProps: {
                    className: "bg-white/10 text-white"
                  },
                  activeOptions: { exact: true },
                  className: "flex items-center space-x-3 rounded-lg border border-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/10 hover:bg-white/6 hover:text-white aria-[current=page]:border-transparent aria-[current=page]:hover:border-transparent",
                  onClick: closeSidebar,
                  children: [
                    /* @__PURE__ */ jsx(Home, { className: "h-5 w-5" }),
                    /* @__PURE__ */ jsx("span", { children: "Início" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/community",
                  activeProps: {
                    className: "bg-white/10 text-white"
                  },
                  className: "flex items-center space-x-3 rounded-lg border border-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/10 hover:bg-white/6 hover:text-white aria-[current=page]:border-transparent aria-[current=page]:hover:border-transparent",
                  onClick: closeSidebar,
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
                    /* @__PURE__ */ jsx("span", { children: "Comunidade" })
                  ]
                }
              ) })
            ] }),
            !user && /* @__PURE__ */ jsx("div", { className: "mt-4 border-t border-white/8 pt-4", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setOpenAuthDialog(true);
                  closeSidebar();
                },
                className: "flex w-full items-center justify-center space-x-3 rounded-lg border border-white/15 bg-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/25 hover:bg-white/6 hover:text-white",
                children: [
                  /* @__PURE__ */ jsx(LogIn, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsx("span", { className: "uppercase", children: "Entrar" })
                ]
              }
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(SignupDialog, { open: openAuthDialog, onOpenChange: setOpenAuthDialog })
  ] });
}
const fetchUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("1f41845ac3b65a581f73e88792eadc03859ad057285ba3f3d7dbd968fe09c1e3"));
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, ...seo({
      title: "Nullspace | Starting from zero is just the beginning. 🪐",
      description: `Welcome to Nullspace. `
    })],
    links: [{
      rel: "stylesheet",
      href: appCss
    }, {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png"
    }, {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png"
    }, {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png"
    }, {
      rel: "manifest",
      href: "/site.webmanifest",
      color: "#fffff"
    }, {
      rel: "icon",
      href: "/favicon.ico"
    }]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(AuthProvider, { initialUser: null, children: /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) }) });
  },
  beforeLoad: async () => {
    const user = await fetchUser();
    return {
      initialUser: user
    };
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  const {
    initialUser
  } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsx(AuthProvider, { initialUser, children: /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({
  children
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname
  });
  const isHome = pathname === "/";
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-dvh bg-ns-gradient text-foreground", children: [
      /* @__PURE__ */ jsxs("main", { className: "root min-h-dvh", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex min-h-dvh", children: [
          /* @__PURE__ */ jsx(Sidebar, { open: sidebarOpen, onOpenChange: setSidebarOpen }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-slate-900/12 px-4 backdrop-blur-lg lg:hidden", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSidebarOpen(true), className: "inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white", "aria-label": "Abrir menu lateral", children: /* @__PURE__ */ jsx(Menu$1, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => setSidebarOpen(false), children: /* @__PURE__ */ jsx("img", { src: "/brand/nullspace-logo.svg", alt: "Nullspace Logo", className: "h-8 w-auto" }) }),
              /* @__PURE__ */ jsx("div", { className: "h-10 w-10", "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: cn("mx-auto h-full w-full max-w-7xl", isHome ? "p-0" : "p-4 sm:p-6 lg:p-8"), children }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Toaster, {})
      ] }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, { buttonPosition: "bottom-left" }),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$4 = () => import("./signup-MplfebC2.js");
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("391e4fddd1127ccfb7d0d44594936a2e78a25b0239ffeab18aa9ec261f329199"));
const Route$5 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const logoutFn = createServerFn().handler(createSsrRpc("566828ec21d0ccdce1df662ede59410e979248719d530394b6aca7f837fe7339"));
const Route$4 = createFileRoute("/logout")({
  preload: false,
  loader: () => logoutFn()
});
const $$splitComponentImporter$3 = () => import("./login-95GSlUd-.js");
const Route$3 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./community-KOtvSTsX.js");
const Route$2 = createFileRoute("/community")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-GVa10t41.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./auth.callback-Clt4BVfE.js");
const callbackSchema = z.object({
  code: z.string().optional(),
  next: z.string().optional()
});
const oauthCallbackFn = createServerFn({
  method: "GET"
}).inputValidator((d) => callbackSchema.parse(d ?? {})).handler(createSsrRpc("41cb0d638bf2811a11f0b4036fc8aefb09fb7dbbe29aca0da3cf350198c14a29"));
const Route = createFileRoute("/auth/callback")({
  validateSearch: (search) => callbackSchema.parse(search ?? {}),
  loaderDeps: ({
    search
  }) => callbackSchema.parse(search ?? {}),
  loader: ({
    deps
  }) => oauthCallbackFn({
    data: deps
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$5.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$6
});
const LogoutRoute = Route$4.update({
  id: "/logout",
  path: "/logout",
  getParentRoute: () => Route$6
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$6
});
const CommunityRoute = Route$2.update({
  id: "/community",
  path: "/community",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const AuthCallbackRoute = Route.update({
  id: "/auth/callback",
  path: "/auth/callback",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  CommunityRoute,
  LoginRoute,
  LogoutRoute,
  SignupRoute,
  AuthCallbackRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const queryClient = new QueryClient();
const getRouter = () => {
  return routerWithQueryClient(
    createRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {})
    }),
    queryClient
  );
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  cn as a,
  createSsrRpc as c,
  router as r,
  signupFn as s
};

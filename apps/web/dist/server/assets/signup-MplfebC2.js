import { jsx, Fragment } from "react/jsx-runtime";
import { u as useMutation, a as useServerFn, A as Auth } from "./Auth-D-kx_3qA.js";
import { s as signupFn } from "./router-CMVwJG91.js";
import "react";
import "@tanstack/react-router";
import "@tanstack/react-query";
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
function SignupComp() {
  const signupMutation = useMutation({
    fn: useServerFn(signupFn)
  });
  return /* @__PURE__ */ jsx(Auth, { actionText: "Criar conta", status: signupMutation.status, onSubmit: (e) => {
    const formData = new FormData(e.target);
    signupMutation.mutate({
      data: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    });
  }, afterSubmit: signupMutation.data?.error ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "text-red-400", children: signupMutation.data.message }) }) : null });
}
export {
  SignupComp as component
};

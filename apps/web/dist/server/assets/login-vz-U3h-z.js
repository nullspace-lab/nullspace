import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { u as useMutation, a as useServerFn, A as Auth } from "./Auth-D-kx_3qA.js";
import { c as createSsrRpc, s as signupFn } from "./router-BXSAFwtv.js";
import { c as createServerFn } from "../server.js";
import "react";
import "@tanstack/react-query";
import "@tanstack/react-router-with-query";
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
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "@tanstack/react-router/ssr/server";
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("d30f677a5605f56175c96ce0a4c22680c841b651708162a6960bc416b12d6533"));
function Login() {
  const router = useRouter();
  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate();
        router.navigate({ to: "/" });
        return;
      }
    }
  });
  const signupMutation = useMutation({
    fn: useServerFn(signupFn)
  });
  return /* @__PURE__ */ jsx(
    Auth,
    {
      actionText: "Entrar",
      status: loginMutation.status,
      onSubmit: (e) => {
        const formData = new FormData(e.target);
        loginMutation.mutate({
          data: {
            email: formData.get("email"),
            password: formData.get("password")
          }
        });
      },
      afterSubmit: loginMutation.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-red-400", children: loginMutation.data.message }),
        loginMutation.data.error && loginMutation.data.message === "Invalid login credentials" ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-blue-500",
            onClick: (e) => {
              const formData = new FormData(
                e.target.form
              );
              signupMutation.mutate({
                data: {
                  email: formData.get("email"),
                  password: formData.get("password")
                }
              });
            },
            type: "button",
            children: "Criar conta?"
          }
        ) }) : null
      ] }) : null
    }
  );
}
function LoginComp() {
  return /* @__PURE__ */ jsx(Login, {});
}
export {
  LoginComp as component
};

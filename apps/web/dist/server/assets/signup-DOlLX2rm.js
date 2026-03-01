import { c as createServerRpc, g as getSupabaseServerClient } from "./supabase-BeayJ5_X.js";
import { redirect } from "@tanstack/react-router";
import { c as createServerFn } from "../server.js";
import "@supabase/ssr";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const signupFn_createServerFn_handler = createServerRpc({
  id: "391e4fddd1127ccfb7d0d44594936a2e78a25b0239ffeab18aa9ec261f329199",
  name: "signupFn",
  filename: "src/routes/signup.tsx"
}, (opts) => signupFn.__executeServer(opts));
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(signupFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  });
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
  throw redirect({
    href: data.redirectUrl || "/"
  });
});
export {
  signupFn_createServerFn_handler
};

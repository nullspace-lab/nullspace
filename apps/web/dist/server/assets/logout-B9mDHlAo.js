import { c as createServerRpc, g as getSupabaseServerClient } from "./supabase-CQZ0guTM.js";
import { redirect } from "@tanstack/react-router";
import { c as createServerFn } from "../server.js";
import "@supabase/ssr";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const logoutFn_createServerFn_handler = createServerRpc({
  id: "566828ec21d0ccdce1df662ede59410e979248719d530394b6aca7f837fe7339",
  name: "logoutFn",
  filename: "src/routes/logout.tsx"
}, (opts) => logoutFn.__executeServer(opts));
const logoutFn = createServerFn().handler(logoutFn_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signOut();
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
  throw redirect({
    href: "/"
  });
});
export {
  logoutFn_createServerFn_handler
};

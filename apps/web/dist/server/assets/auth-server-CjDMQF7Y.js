import { c as createServerRpc, g as getSupabaseServerClient } from "./supabase-CQZ0guTM.js";
import { c as createServerFn } from "../server.js";
import "@supabase/ssr";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const loginFn_createServerFn_handler = createServerRpc({
  id: "d30f677a5605f56175c96ce0a4c22680c841b651708162a6960bc416b12d6533",
  name: "loginFn",
  filename: "src/utils/auth-server.ts"
}, (opts) => loginFn.__executeServer(opts));
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
});
export {
  loginFn_createServerFn_handler
};

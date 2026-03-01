import { c as createServerRpc, g as getSupabaseServerClient } from "./supabase-BeayJ5_X.js";
import { c as createServerFn } from "../server.js";
import "@supabase/ssr";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const fetchUser_createServerFn_handler = createServerRpc({
  id: "1f41845ac3b65a581f73e88792eadc03859ad057285ba3f3d7dbd968fe09c1e3",
  name: "fetchUser",
  filename: "src/routes/__root.tsx"
}, (opts) => fetchUser.__executeServer(opts));
const fetchUser = createServerFn({
  method: "GET"
}).handler(fetchUser_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    data
  } = await supabase.auth.getUser();
  if (!data.user?.email) return null;
  return {
    id: data.user.id,
    email: data.user.email,
    user_metadata: data.user.user_metadata
  };
});
export {
  fetchUser_createServerFn_handler
};

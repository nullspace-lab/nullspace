import { c as createServerRpc, g as getSupabaseServerClient } from "./supabase-CQZ0guTM.js";
import { redirect } from "@tanstack/react-router";
import { z } from "zod";
import { c as createServerFn } from "../server.js";
import "@supabase/ssr";
import "node:async_hooks";
import "tiny-invariant";
import "node:stream";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const callbackSchema = z.object({
  code: z.string().optional(),
  next: z.string().optional()
});
const oauthCallbackFn_createServerFn_handler = createServerRpc({
  id: "41cb0d638bf2811a11f0b4036fc8aefb09fb7dbbe29aca0da3cf350198c14a29",
  name: "oauthCallbackFn",
  filename: "src/routes/auth.callback.tsx"
}, (opts) => oauthCallbackFn.__executeServer(opts));
const oauthCallbackFn = createServerFn({
  method: "GET"
}).inputValidator((d) => callbackSchema.parse(d ?? {})).handler(oauthCallbackFn_createServerFn_handler, async ({
  data
}) => {
  const code = data.code;
  let next = data.next ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }
  if (!code) {
    throw redirect({
      href: next
    });
  }
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    throw redirect({
      href: "/login"
    });
  }
  throw redirect({
    href: next
  });
});
export {
  oauthCallbackFn_createServerFn_handler
};

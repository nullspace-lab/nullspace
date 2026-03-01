import { T as TSS_SERVER_FUNCTION, s as setCookie, a as getCookies } from "../server.js";
import { createServerClient } from "@supabase/ssr";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function getSupabaseServerClient() {
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value);
          });
        }
      }
    }
  );
}
export {
  createServerRpc as c,
  getSupabaseServerClient as g
};

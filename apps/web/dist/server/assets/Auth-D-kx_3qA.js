import * as React from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) {
          throw res;
        }
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router.state.location;
          return router.navigate(router.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router, serverFn]
  );
}
function useMutation(opts) {
  const [submittedAt, setSubmittedAt] = React.useState();
  const [variables, setVariables] = React.useState();
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();
  const [status, setStatus] = React.useState("idle");
  const mutate = React.useCallback(
    async (variables2) => {
      setStatus("pending");
      setSubmittedAt(Date.now());
      setVariables(variables2);
      try {
        const data2 = await opts.fn(variables2);
        await opts.onSuccess?.({ data: data2 });
        setStatus("success");
        setError(void 0);
        setData(data2);
        return data2;
      } catch (err) {
        setStatus("error");
        setError(err);
      }
    },
    [opts.fn]
  );
  return {
    status,
    variables,
    submittedAt,
    mutate,
    error,
    data
  };
}
function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center overflow-y-auto bg-slate-800 p-4 sm:p-8", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-center text-2xl font-bold text-white", children: actionText }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          onSubmit(e);
        },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "email",
                className: "mb-2 block text-sm font-medium text-white",
                children: "E-mail"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                id: "email",
                className: "w-full rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary",
                placeholder: "Digite seu e-mail"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "password",
                className: "mb-2 block text-sm font-medium text-white",
                children: "Senha"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                name: "password",
                id: "password",
                className: "w-full rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary",
                placeholder: "Digite sua senha"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full rounded-lg bg-primary py-3 font-medium uppercase tracking-wide text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
              disabled: status === "pending",
              children: status === "pending" ? "Carregando..." : actionText
            }
          ),
          afterSubmit ? /* @__PURE__ */ jsx("div", { className: "mt-4", children: afterSubmit }) : null
        ]
      }
    )
  ] }) });
}
export {
  Auth as A,
  useServerFn as a,
  useMutation as u
};

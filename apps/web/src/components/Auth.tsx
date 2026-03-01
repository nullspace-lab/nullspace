import type React from 'react';

export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: 'pending' | 'idle' | 'success' | 'error';
  afterSubmit?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-slate-800 p-4 sm:p-8">
      <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-lg sm:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          {actionText}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 transition-colors duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-medium uppercase tracking-wide text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? 'Carregando...' : actionText}
          </button>
          {afterSubmit ? <div className="mt-4">{afterSubmit}</div> : null}
        </form>
      </div>
    </div>
  );
}

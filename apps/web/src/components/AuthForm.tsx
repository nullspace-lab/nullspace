import type React from 'react';

export function AuthForm({
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        {actionText}
      </h1>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-2"
        >
          Username
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="px-3 py-2 w-full rounded-lg border border-slate-700 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="px-3 py-2 w-full rounded-lg border border-slate-700 bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-medium uppercase tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={status === 'pending'}
      >
        {status === 'pending' ? 'Loading…' : actionText}
      </button>

      {afterSubmit ? <div className="mt-4">{afterSubmit}</div> : null}
    </form>
  );
}

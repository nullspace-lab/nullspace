import { Dialog } from '@base-ui/react/dialog';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandGoogle,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useAuth } from '~/contexts/auth';

export function SignupDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { signInWithGithub } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGithubSignIn = async () => {
    setIsRedirecting(true);

    const next = `${window.location.pathname}${window.location.search}`;

    const { error } = await signInWithGithub(next);

    // If redirect doesn't happen (error path), re-enable interaction.
    if (error) {
      setIsRedirecting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-slate-950/45 transition-opacity" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900/14 p-5 backdrop-blur-lg sm:p-6">
          <Dialog.Title className="mb-4 border-b border-white/8 pb-4 text-center text-lg font-semibold text-white">
            Entrar com
          </Dialog.Title>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleGithubSignIn}
              disabled={isRedirecting}
              className="group relative flex h-10 w-full items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-slate-900/12 px-4 font-medium text-white transition-colors duration-200 hover:border-ring/70 hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <IconBrandGithub className="h-6 w-6 text-neutral-300" />
              <span className="text-sm text-neutral-300">
                {isRedirecting ? 'Redirecionando...' : 'GitHub'}
              </span>
              {!isRedirecting ? <BottomGradient /> : null}
            </button>

            <button
              disabled
              className="flex h-10 w-full cursor-not-allowed items-center gap-2 rounded-lg border border-white/8 bg-slate-900/10 px-4 font-medium text-neutral-400 opacity-50"
            >
              <IconBrandGoogle className="h-6 w-6" />
              <span className="text-sm">Google</span>
            </button>

            <button
              disabled
              className="flex h-10 w-full cursor-not-allowed items-center gap-2 rounded-lg border border-white/8 bg-slate-900/10 px-4 font-medium text-neutral-400 opacity-50"
            >
              <IconBrandLinkedin className="h-6 w-6" />
              <span className="text-sm">LinkedIn</span>
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function BottomGradient() {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_20px_hsl(var(--ring)_/_0.6)] transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-8 -bottom-px mx-auto h-[2px] w-2/3 bg-gradient-to-r from-transparent via-ring to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );
}

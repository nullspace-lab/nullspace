import { Dialog } from '@base-ui-components/react/dialog';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandGoogle,
} from '@tabler/icons-react';
import { useAuth } from '~/contexts/auth';

export function SignupDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { signInWithGithub } = useAuth();

  const handleGithubSignIn = async () => {
    signInWithGithub();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/60 transition-opacity" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-dark p-6 outline outline-1 outline-slate-700 shadow-input">
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleGithubSignIn}
              className="group relative flex h-10 w-full items-center gap-2 rounded-md bg-slate-900 px-4 font-medium text-white shadow-[0px_0px_1px_1px_#262626] hover:bg-slate-800 border border-transparent active:border-slate-500 transition-all duration-100"
            >
              <IconBrandGithub className="h-6 w-6 text-neutral-300" />
              <span className="text-sm text-neutral-300">GitHub</span>
              <BottomGradient />
            </button>

            <button
              disabled
              className="group relative flex h-10 w-full items-center gap-2 rounded-md bg-slate-800/60 px-4 font-medium text-neutral-400 shadow-[0px_0px_1px_1px_#262626] opacity-50 cursor-not-allowed"
            >
              <IconBrandGoogle className="h-6 w-6" />
              <span className="text-sm">Google</span>
            </button>

            <button
              disabled
              className="group relative flex h-10 w-full items-center gap-2 rounded-md bg-slate-800/60 px-4 font-medium text-neutral-400 shadow-[0px_0px_1px_1px_#262626] opacity-50 cursor-not-allowed"
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
      <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
    </>
  );
}

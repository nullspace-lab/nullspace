import { Link } from '@tanstack/react-router';
import { Menu } from '@base-ui/react/menu';
import { Avatar } from '@base-ui/react/avatar';
import { ChevronUp, Home, LogOut, Users, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '~/utils/tailwind';
import { SignupDialog } from './SignupDialog';
import { useAuth } from '~/contexts/auth';

type SidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const { user, signOut } = useAuth();

  const closeSidebar = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
      <button
        type="button"
        aria-label="Fechar menu"
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/35 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeSidebar}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-white/8 bg-slate-900/12 backdrop-blur-xl transform transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:w-64 lg:max-w-none lg:translate-x-0',
          {
            'translate-x-0': open,
            '-translate-x-full': !open,
          },
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-white/8 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <Link to="/" onClick={closeSidebar}>
                <img
                  src="/brand/nullspace-logo.svg"
                  alt="Nullspace Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <Menu.Root>
                  <Menu.Trigger>
                    <button className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-600 align-middle text-base font-medium text-white select-none hover:bg-slate-500 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary">
                      <Avatar.Root className="size-full">
                        <Avatar.Image
                          src={user?.user_metadata?.avatar_url}
                          width="48"
                          height="48"
                          className="size-full object-cover"
                        />
                        <Avatar.Fallback
                          className="flex size-full items-center justify-center text-base"
                          delay={300}
                        >
                          <span>
                            {user
                              ? user?.email?.charAt(0).toUpperCase() || 'U'
                              : null}
                          </span>
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </button>
                  </Menu.Trigger>
                  <Menu.Portal>
                    <Menu.Positioner className="z-50 outline-none" sideOffset={8}>
                      <Menu.Popup className="origin-[var(--transform-origin)] min-w-[220px] rounded-xl border border-white/10 bg-slate-900/14 py-3 text-white backdrop-blur-lg transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
                        <Menu.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                          <ChevronUp className="h-5 w-5 text-white/20" />
                        </Menu.Arrow>

                        <div className="border-b border-white/8 px-4 py-3">
                          <p className="text-sm font-medium text-white/90">{user?.email}</p>
                        </div>

                        <Menu.Item>
                          <button
                            onClick={signOut}
                            className="mx-2 flex w-[calc(100%-1rem)] select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm leading-5 text-white/90 outline-none transition-colors duration-150 data-[highlighted]:bg-white/8 data-[highlighted]:text-white"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                          </button>
                        </Menu.Item>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              )}
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden"
                onClick={closeSidebar}
                aria-label="Fechar menu lateral"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-3">
            <ul className="space-y-2 border-t border-white/8 pt-4">
              <li>
                <Link
                  to="/"
                  activeProps={{
                    className: 'bg-white/10 text-white',
                  }}
                  activeOptions={{ exact: true }}
                  className="flex items-center space-x-3 rounded-lg border border-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/10 hover:bg-white/6 hover:text-white aria-[current=page]:border-transparent aria-[current=page]:hover:border-transparent"
                  onClick={closeSidebar}
                >
                  <Home className="h-5 w-5" />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  activeProps={{
                    className: 'bg-white/10 text-white',
                  }}
                  className="flex items-center space-x-3 rounded-lg border border-transparent px-3 py-2 text-white/90 transition-all duration-200 hover:border-white/10 hover:bg-white/6 hover:text-white aria-[current=page]:border-transparent aria-[current=page]:hover:border-transparent"
                  onClick={closeSidebar}
                >
                  <Users className="h-5 w-5" />
                  <span>Comunidade</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <SignupDialog open={openAuthDialog} onOpenChange={setOpenAuthDialog} />
    </>
  );
}

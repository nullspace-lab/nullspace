import { Link } from '@tanstack/react-router';
import { Menu } from '@base-ui-components/react/menu';
import { Avatar } from '@base-ui-components/react/avatar';
import { ChevronUp, Home, LogIn, LogOut, Users } from 'lucide-react';
import { HoverBorderGradient } from './ui/HoverBorderGradient';
import * as React from 'react';
import { cn } from '~/utils/tailwind';
import { SignupDialog } from './SignupDialog';
import { useAuth } from '~/contexts/auth';

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);

  const { user, signOut } = useAuth();


  return (
    <>
      <div
        className={cn(
          `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0`,
          {
            'translate-x-0': sidebarOpen,
            '-translate-x-full': !sidebarOpen,
          },
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-r border-slate-700">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img src="./brand/nullspace-logo.svg" alt="Nullspace Logo" />
              </Link>
            </div>
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
                    <Menu.Popup className="origin-[var(--transform-origin)] min-w-[200px] rounded-lg bg-slate-800 py-3 text-white shadow-lg shadow-black/20 outline outline-1 outline-slate-700 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
                      <Menu.Arrow className="data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180">
                        <ChevronUp className="h-5 w-5 text-slate-800" />
                      </Menu.Arrow>

                      <div className="border-b border-slate-700 px-4 py-3">
                        <p className="text-sm font-medium">{user?.email}</p>
                      </div>

                      <Menu.Item>
                        <button
                          onClick={signOut}
                          className="flex select-none items-center gap-3 px-4 py-3 text-sm leading-5 outline-none transition-colors duration-150 data-[highlighted]:bg-slate-700 data-[highlighted]:text-white"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-3 border-r border-slate-700">
            <ul className="space-y-2 pt-4 border-t border-slate-700">
              <li>
                <Link
                  to="/"
                  activeProps={{
                    className: 'bg-slate-700',
                  }}
                  activeOptions={{ exact: true }}
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/circles"
                  activeProps={{
                    className: 'bg-slate-700',
                  }}
                  className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <Users className="h-5 w-5" />
                  <span>Circles</span>
                </Link>
              </li>
            </ul>

            {!user && (
              <div className="border-t pt-4 border-slate-700 mt-4">
                <HoverBorderGradient
                  onClick={() => setOpenAuthDialog(true)}
                  containerClassName="rounded-lg w-full"
                  as="button"
                  className="w-full flex justify-center items-center space-x-3 px-3 py-2 text-white rounded-lg transition-colors duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="uppercase">Sign In</span>
                </HoverBorderGradient>
              </div>
            )}
          </nav>
        </div>

        <SignupDialog
          open={openAuthDialog}
          onOpenChange={() => setOpenAuthDialog(true)}
        />
      </div>
    </>
  );
}

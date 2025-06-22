/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router';
import { Avatar } from '@base-ui-components/react/avatar';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';
import { Home, LogIn } from 'lucide-react';
import { getSupabaseServerClient } from '../utils/supabase';
import { Toaster } from 'react-hot-toast';
import { cn } from '~/utils/tailwind';

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data, error: _error } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return {
    email: data.user.email,
  };
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      user,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { user } = Route.useRouteContext();

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="h-screen flex flex-col min-h-0 root">
          <div className="flex h-screen bg-gray-900">
            {/* Sidebar */}
            <div
              className={cn(
                `fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out
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
                      <img
                        src="./brand/nullspace-logo.svg"
                        alt="Nullspace Logo"
                      />
                    </Link>
                  </div>
                  {user && (
                    <Avatar.Root className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-600 align-middle text-base font-medium text-black select-none">
                      <Avatar.Image
                        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
                        width="48"
                        height="48"
                        className="size-full object-cover"
                      />
                      <Avatar.Fallback className="flex size-full items-center justify-center text-base">
                        <span>{user ? user?.email?.charAt(0).toUpperCase() || 'U' : null}</span>
                      </Avatar.Fallback>
                    </Avatar.Root>
                  )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-3 border-r border-slate-700">
                  <ul className="space-y-2 pt-4 border-t border-slate-700">
                    <li>
                      <Link
                        to="/"
                        activeProps={{
                          className: 'font-bold bg-slate-700',
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
                        to="/posts"
                        activeProps={{
                          className: 'font-bold bg-slate-700',
                        }}
                        className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                      >
                        <Home className="w-5 h-5" />
                        <span>Posts</span>
                      </Link>
                    </li>
                  </ul>

                  {!user && (
                    <div className="border-t pt-4 border-slate-700 mt-4">
                      <Link
                        to="/login"
                        className="flex  justify-center items-center space-x-3 px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors duration-200 border"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <LogIn className="w-5 h-5" />
                        <span className="uppercase">Sign In</span>
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0 bg-slate-800">
              <main className="flex-1 overflow-auto">
                <div className="h-full p-6">{children}</div>
              </main>
            </div>
          </div>

          <Toaster />
        </main>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

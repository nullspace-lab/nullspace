import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import type { QueryClient } from '@tanstack/react-query';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { Home, X } from 'lucide-react';
import { IconLink } from '~/components/IconLink';
import { NotFound } from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';
import { Loader } from '~/components/Loader';
import { Avatar } from '@base-ui-components/react/avatar';
import { cn } from '~/utils/tailwind';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <main className="h-screen flex flex-col min-h-0 root">
          <div className="flex h-screen bg-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

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
                    <img
                      src="./public/brand/nullspace-logo.svg"
                      alt="Nullspace Logo"
                    />
                  </div>
                  <Avatar.Root className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full bg-slate-600 align-middle text-base font-medium text-black select-none">
                    <Avatar.Image
                      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
                      width="48"
                      height="48"
                      className="size-full object-cover"
                    />
                    <Avatar.Fallback className="flex size-full items-center justify-center text-base">
                      LT
                    </Avatar.Fallback>
                  </Avatar.Root>
                  {/* Mobile close button */}
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden text-white hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-3 border-r border-slate-700">
                  <ul className="space-y-2 pt-4 border-t border-slate-700">
                    <li>
                      <Link
                        to="/"
                        className="flex items-center space-x-3 px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                      </Link>
                    </li>
                    {/* Add more navigation items here */}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 bg-slate-800">
              {/* Main content area */}
              <main className="flex-1 overflow-auto">
                <LoadingIndicator />
                <div className="h-full p-6">{children}</div>
              </main>
            </div>
          </div>

          <Toaster />
        </main>
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  return (
    <div
      className={`h-12 transition-all duration-300 ${
        isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
      }`}
    >
      <Loader />
    </div>
  );
}

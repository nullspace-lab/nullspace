/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { NotFound } from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '~/contexts/auth';
import { getSupabaseServerClient } from '~/utils/supabase';
import { createServerFn } from '@tanstack/react-start';
import { Sidebar } from '~/components/Sidebar';
import { Menu } from 'lucide-react';
import { cn } from '~/utils/tailwind';

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user?.email) return null;

  return {
    id: data.user.id,
    email: data.user.email,
    user_metadata: data.user.user_metadata,
  };
});
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
        title: 'Nullspace | Starting from zero is just the beginning. 🪐',
        description: `Welcome to Nullspace. `,
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
      <AuthProvider initialUser={null}>
        <RootDocument>
          <DefaultCatchBoundary {...props} />
        </RootDocument>
      </AuthProvider>
    );
  },
  beforeLoad: async () => {
    const user = await fetchUser();

    return {
      initialUser: user,
    };
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const { initialUser } = Route.useRouteContext();

  return (
    <AuthProvider initialUser={initialUser}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </AuthProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === '/';

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-ns-gradient text-foreground">
        <main className="root min-h-dvh">
          <div className="flex min-h-dvh">
            <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
            <div className="flex min-w-0 flex-1 flex-col">
              <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-slate-900/12 px-4 backdrop-blur-lg lg:hidden">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  aria-label="Abrir menu lateral"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <Link to="/" onClick={() => setSidebarOpen(false)}>
                  <img
                    src="./brand/nullspace-logo.svg"
                    alt="Nullspace Logo"
                    className="h-8 w-auto"
                  />
                </Link>
                <div className="h-10 w-10" aria-hidden />
              </header>
              <main className="flex-1 overflow-y-auto">
                <div
                  className={cn(
                    'mx-auto h-full w-full max-w-7xl',
                    isHome ? 'p-0' : 'p-4 sm:p-6 lg:p-8',
                  )}
                >
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </main>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

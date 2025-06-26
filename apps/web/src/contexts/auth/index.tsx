import { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthTokenResponsePassword,
  OAuthResponse,
  AuthError,
  Session,
  User,
  AuthChangeEvent,
} from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

export type InitialUser = Pick<User, 'id' | 'email' | 'user_metadata'>;

type AuthContextValue = {
  session: Session | null;
  user: InitialUser | null;
  signIn: (
    email: string,
    password: string,
  ) => Promise<AuthTokenResponsePassword>;
  authEvent?: AuthChangeEvent;
  signInWithGithub: () => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: InitialUser | null;
}) {
  const [authEvent, setAuthEvent] = useState<AuthChangeEvent>();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<InitialUser | null>(initialUser ?? null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthEvent(event);
      if (event === 'SIGNED_IN' && session) {
        setSession(session);
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGithub = async () =>
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
        scopes: 'read:user user:email',
        queryParams: { response_type: 'code' },
      },
    });

  const signOut = async () => {
    setSession(null);
    setUser(null);

    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signIn,
        signInWithGithub,
        signOut,
        user,
        authEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

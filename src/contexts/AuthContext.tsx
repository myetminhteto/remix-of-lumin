import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRole } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    companyName: string,
    country: string,
    role: UserRole
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user role from database
  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }

      return data?.role as UserRole | null;
    } catch (err) {
      console.error("Error fetching user role:", err);
      return null;
    }
  }, []);

  // Handle auth state changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          // Defer role fetching to avoid race conditions
          setTimeout(async () => {
            const role = await fetchUserRole(newSession.user.id);
            setUserRole(role);
            setIsLoading(false);
          }, 0);
        } else {
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);

      if (existingSession?.user) {
        const role = await fetchUserRole(existingSession.user.id);
        setUserRole(role);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole]);

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    companyName: string,
    country: string,
    role: UserRole
  ) => {
    try {
      const redirectUrl = window.location.origin;

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) {
        return { error: authError };
      }

      if (!authData.user) {
        return { error: new Error("Failed to create user") };
      }

      // Create profile
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: authData.user.id,
        email,
        company_name: companyName,
        country,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        return { error: profileError };
      }

      // Create user role
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role,
      });

      if (roleError) {
        console.error("Role creation error:", roleError);
        return { error: roleError };
      }

      setUserRole(role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

      return { error: null };
    } catch (err) {
      console.error("Sign up error:", err);
      return { error: err as Error };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        const role = await fetchUserRole(data.user.id);
        setUserRole(role);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }

      return { error: null };
    } catch (err) {
      console.error("Sign in error:", err);
      return { error: err as Error };
    }
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserRole(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userRole,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

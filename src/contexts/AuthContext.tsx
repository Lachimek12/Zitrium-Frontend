/* Libraries */
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface User {
  name: string;
}

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

function AuthProvider({ children, isSignedIn }: AuthProviderProps) {
  // Uses `isSignedIn` prop to determine whether or not to render a user
  const [user] = useState<User | null>(isSignedIn ? { name: "Zbygniew" } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };

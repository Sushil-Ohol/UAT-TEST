import { createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/slices";
import { AuthState } from "store/slices/signIn";

export const AuthContext = createContext<AuthState | null>(null);

export interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useSelector((state: RootState) => state.auth);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

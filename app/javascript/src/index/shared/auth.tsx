import { createContext, useContext } from "react";

interface Auth {
  currentUser?: object;
  token?: string;
  signIn?: (token: string, user: object) => void;
  sighOut?: () => void;
}

export const AuthContext = createContext({});

export function useAuth(): Auth {
  return useContext(AuthContext);
}

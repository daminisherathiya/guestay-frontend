import { type ReactNode } from "react";

export interface AuthenticationContextType {
  authenticationStateIsLoading: boolean;
  handleLogIn: ({
    authenticationToken,
  }: {
    authenticationToken: string;
  }) => void;
  handleLogOut: () => void;
  isAuthenticated: boolean | null;
}

export interface AuthenticationProviderProps {
  children: ReactNode;
}

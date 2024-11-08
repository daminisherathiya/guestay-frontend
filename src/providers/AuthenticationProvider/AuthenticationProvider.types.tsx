import { type ReactNode } from "react";

import { UserDataType } from "@/types/User.types";

export interface AuthenticationContextType {
  authenticationStateIsLoading: boolean;
  handleLogIn: ({
    authenticationToken,
    userDetails,
  }: {
    authenticationToken: string;
    userDetails: UserDataType;
  }) => void;
  handleLogOut: () => void;
  isAuthenticated: boolean | null;
  userDetails: UserDataType | null;
}

export interface AuthenticationProviderProps {
  children: ReactNode;
}

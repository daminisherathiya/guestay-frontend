"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import { CircularProgress } from "@/components/atoms/CircularProgress";
import {
  hasAuthenticationToken,
  removeAuthenticationToken,
  setAuthenticationToken,
} from "@/utils/localStorage/localStorage";

import {
  type AuthenticationContextType,
  type AuthenticationProviderProps,
} from "./AuthenticationProvider.types";

export const AuthenticationContext = createContext<AuthenticationContextType>({
  authenticationStateIsLoading: true,
  handleLogIn: () => {},
  handleLogOut: () => {},
  isAuthenticated: false,
});

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [authenticationStateIsLoading, setAuthenticationStateIsLoading] =
    useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  console.log("🚀 ~ isAuthenticated:", isAuthenticated);

  useEffect(() => {
    setIsAuthenticated(hasAuthenticationToken());
    setAuthenticationStateIsLoading(false);
  }, []);

  const handleLogIn = useCallback(
    ({ authenticationToken }: { authenticationToken: string }) => {
      setAuthenticationToken({ authenticationToken: authenticationToken });
      setIsAuthenticated(true);
    },
    [],
  );

  const handleLogOut = useCallback(() => {
    removeAuthenticationToken();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticationStateIsLoading,
        handleLogIn,
        handleLogOut,
        isAuthenticated,
      }}
    >
      {authenticationStateIsLoading ? (
        <CircularProgress className="mx-auto" />
      ) : (
        children
      )}
    </AuthenticationContext.Provider>
  );
};

"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import { UserDataType } from "@/types/User.types";
import {
  getUserDetails,
  hasAuthenticationToken,
  removeAuthenticationToken,
  removeUserDetails,
  setAuthenticationToken as setAuthenticationTokenInLocalstorage,
  setUserDetails as setUserDetailsInLocalstorage,
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
  userDetails: null,
});

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [authenticationStateIsLoading, setAuthenticationStateIsLoading] =
    useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<UserDataType | null>(null);

  console.log("🚀 ~ isAuthenticated:", isAuthenticated);

  useEffect(() => {
    const authenticationTokenIsPresent = hasAuthenticationToken();
    const useDetials = getUserDetails();

    if (authenticationTokenIsPresent && useDetials) {
      setIsAuthenticated(true);
      setUserDetails(useDetials);
    } else {
      setIsAuthenticated(false);
      setUserDetails(null);
    }

    setAuthenticationStateIsLoading(false);
  }, []);

  const handleLogIn = useCallback(
    ({
      authenticationToken,
      userDetails,
    }: {
      authenticationToken: string;
      userDetails: UserDataType;
    }) => {
      setAuthenticationTokenInLocalstorage({
        authenticationToken: authenticationToken,
      });
      setUserDetailsInLocalstorage({ userDetails });

      setUserDetails(userDetails);
      setIsAuthenticated(true);
    },
    [],
  );

  const handleLogOut = useCallback(() => {
    removeAuthenticationToken();
    removeUserDetails();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticationStateIsLoading,
        handleLogIn,
        handleLogOut,
        isAuthenticated,
        userDetails,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

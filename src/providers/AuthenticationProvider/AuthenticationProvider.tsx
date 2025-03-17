"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import { useBoolean } from "@/hooks/useBoolean";
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
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    value: authenticationStateIsLoading,
    setFalse: setAuthenticationStateIsLoadingFalse,
  } = useBoolean({ initialValue: true });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<UserDataType | null>(null);

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

    setAuthenticationStateIsLoadingFalse();
  }, [setAuthenticationStateIsLoadingFalse]);

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
    queryClient.clear();
    router.push("/");
  }, [queryClient, router]);

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

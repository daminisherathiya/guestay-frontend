"use client";

import { usePathname } from "next/navigation";

import NotFound from "@/app/not-found";
import { CircularProgress } from "@/components/atoms/CircularProgress";
import { Stack } from "@/components/atoms/Stack";
import { LOGIN_SIGNUP_PATHS } from "@/consts/common";
import { useAuthentication } from "@/hooks/useAuthentication";

import { AuthenticationLoaderProps } from "./AuthenticationLoader.types";

export function AuthenticationLoader({ children }: AuthenticationLoaderProps) {
  const pathname = usePathname();

  const { authenticationStateIsLoading, isAuthenticated } = useAuthentication();

  if (authenticationStateIsLoading) {
    return (
      <Stack className="h-[calc(100vh-6.375rem)] items-center justify-center">
        <CircularProgress disableShrink className="mx-auto" />
      </Stack>
    );
  }

  if (!isAuthenticated && !LOGIN_SIGNUP_PATHS.includes(pathname)) {
    return <NotFound />;
  }

  return <>{children}</>;
}

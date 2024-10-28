"use client";

import { CircularProgress } from "@/components/atoms/CircularProgress";
import { Stack } from "@/components/atoms/Stack";
import { useAuthentication } from "@/hooks/useAuthentication";

import { AuthenticationLoaderProps } from "./AuthenticationLoader.types";

export function AuthenticationLoader({ children }: AuthenticationLoaderProps) {
  const { authenticationStateIsLoading } = useAuthentication();

  if (authenticationStateIsLoading) {
    return (
      <Stack className="h-[calc(100vh-6.375rem)] items-center justify-center">
        <CircularProgress disableShrink className="mx-auto" />
      </Stack>
    );
  }

  return <>{children}</>;
}

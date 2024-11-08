"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { QueryProviderProps } from "./QueryProvider.types";

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

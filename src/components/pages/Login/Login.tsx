"use client";

import { useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { useAuthentication } from "@/hooks/useAuthentication";

import { Login as LoginComponent } from "../../organisms/Login";

export function Login() {
  const route = useRouter();

  const handleOpenSignUp = useCallback(() => {
    route.push("signup");
  }, [route]);

  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (isAuthenticated) {
      route.push("/");
    }
  }, [isAuthenticated, route]);

  return (
    <Container maxWidth="2xl">
      <Grid2 container className="justify-center">
        <Grid2 size={{ lg: 6, md: 7, sm: 10, xl: 5 }}>
          <Stack className="min-h-[calc(100vh-6rem)] items-center justify-center sm:min-h-[calc(100vh-6.375rem)]">
            <Box className="my-5 flex size-full grow flex-col items-center justify-center md:my-10">
              <Box className="rounded-lg border border-common-black/45">
                <Typography className="p-4 text-center font-bold sm:p-5 md:px-8 md:py-5">
                  Log In
                </Typography>
                <Divider />
                <Box className="p-4 sm:p-8 md:p-5">
                  <LoginComponent
                    handleCloseLogin={() => {}}
                    handleOpenSignUp={handleOpenSignUp}
                    isLoginDialogOpen={false}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}

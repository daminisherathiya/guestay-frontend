"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { Signup as SignupComponent } from "../../organisms/Signup";

export function Signup() {
  const route = useRouter();

  const handleOpenLoginDialog = useCallback(() => {
    route.push("login");
  }, [route]);

  return (
    <Container maxWidth="2xl">
      <Grid2 container className="justify-center">
        <Grid2 size={{ lg: 8, md: 9, sm: 10, xl: 6 }}>
          <Stack className="min-h-[calc(100vh-6rem)] items-center justify-center sm:min-h-[calc(100vh-6.375rem)]">
            <Box className="my-5 flex size-full grow flex-col items-center justify-center md:my-10">
              <Box className="rounded-lg border border-common-black/45">
                <Typography className="text-center font-bold 2xs:p-4 sm:p-5 md:px-8 md:py-5">
                  Sign Up
                </Typography>
                <Divider />
                <Box className="2xs:p-4 sm:p-5 md:p-8">
                  <SignupComponent
                    handleCloseSignUp={() => {}}
                    handleOpenLogin={handleOpenLoginDialog}
                    isSignUpDialogOpen={false}
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

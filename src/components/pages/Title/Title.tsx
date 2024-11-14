"use client";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Typography } from "@/components/atoms/Typography";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper";

import { useTitle } from "./Title.hooks";

export function Title() {
  const {
    control,
    Footer,
    isLoading,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    titleLength,
  } = useTitle();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-2" component="h1" variant="h1">
            Now, let&apos;s give your house a title
          </Typography>
          <Typography
            className="mb-8 text-text-secondary"
            component="h3"
            variant="h3"
          >
            Short titles work best. Have fun with it – you can always change it
            later.
          </Typography>
          {isLoading ? (
            <Skeleton
              className="w-full rounded-lg"
              height={56}
              variant="rectangular"
            />
          ) : (
            <>
              <TextFieldWrapper
                control={control}
                label=""
                name="title"
                placeholder="Enter a catchy name that best describes your property"
                rules={{
                  maxLength: {
                    message: "Title cannot exceed 55 characters",
                    value: 55,
                  },
                  required: "Title is required",
                }}
              />
              <Typography className="pt-4 text-text-secondary" variant="body2">
                {titleLength}/55
              </Typography>
            </>
          )}
        </Box>
      </Container>
      {Footer}
      {PropertyApiSnackbarAlert}
      {SavePropertyApiSnackbarAlert}
    </>
  );
}

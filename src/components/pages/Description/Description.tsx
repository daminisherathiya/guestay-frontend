"use client";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { TextareaAutosize } from "@/components/atoms/TextareaAutosize";
import { Typography } from "@/components/atoms/Typography";

import { useDescription } from "./Description.hooks";

export function Description() {
  const { description, Footer, handleDescriptionChange, isLoading } =
    useDescription();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-2" component="h1" variant="h1">
            Create your description
          </Typography>
          <Typography
            className="mb-8 text-text-secondary"
            component="h3"
            variant="h3"
          >
            Share what makes your place special.
          </Typography>
          {isLoading ? (
            <Skeleton
              className="w-full rounded-lg"
              height={190}
              variant="rectangular"
            />
          ) : (
            <>
              <TextareaAutosize
                className="w-full rounded-lg border p-6 text-xl focus:outline-2 focus:outline-common-black"
                id="title"
                maxRows={5}
                minRows={5}
                value={description}
                onChange={handleDescriptionChange}
              />
              <Typography className="pt-4 text-text-secondary" variant="body2">
                {description.length}/500
              </Typography>
            </>
          )}
        </Box>
      </Container>
      {Footer}
    </>
  );
}

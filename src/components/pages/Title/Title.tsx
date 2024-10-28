"use client";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { TextareaAutosize } from "@/components/atoms/TextareaAutosize";
import { Typography } from "@/components/atoms/Typography";
import { useOverview } from "@/hooks/useStaticFooter";

import { useTitle } from "./Title.hooks";

export function Title() {
  const { handleTitleChange, title } = useTitle();
  const { Footer } = useOverview();

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
          <TextareaAutosize
            className="w-full rounded-lg border p-6 text-xl focus:outline-2 focus:outline-common-black"
            id="title"
            maxRows={5}
            minRows={5}
            value={title}
            onChange={handleTitleChange}
          />
          <Typography className="pt-4 text-text-secondary" variant="body2">
            {title.length}/32
          </Typography>
        </Box>
      </Container>
      {Footer}
    </>
  );
}

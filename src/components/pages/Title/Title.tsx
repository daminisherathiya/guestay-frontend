"use client";

import { useState } from "react";

import TextareaAutosize from "@mui/material/TextareaAutosize";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Typography } from "@/components/atoms/Typography";

export default function Title() {
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= 32) {
      setTitle(newValue);
    } else {
      setTitle(newValue.slice(0, 32));
    }
  };
  return (
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
  );
}

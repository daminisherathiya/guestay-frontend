import Image from "next/image";

import { Button, Container, Stack } from "@mui/material";

import logo from "@/public/images/logo.svg";

export function Header() {
  return (
    <Container
      className="fixed top-0 z-10 w-full bg-common-white"
      maxWidth="2xl"
    >
      <Stack className="flex-row justify-between pb-5 pt-8">
        <Image alt="Logo" src={logo} />
        <Stack className="flex-row gap-4">
          <Button
            className="rounded-3xl hover:bg-common-white"
            variant="outlined"
          >
            Questions?
          </Button>
          <Button
            className="rounded-3xl hover:bg-common-white"
            variant="outlined"
          >
            Exit
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

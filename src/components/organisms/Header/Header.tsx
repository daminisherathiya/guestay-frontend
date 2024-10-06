"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Drawer } from "@/components/atoms/Drawer";
import { Stack } from "@/components/atoms/Stack";

import QuestionsDrawer from "../QuestionsDrawer/QuestionsDrawer";

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const [openQuestionsDrawer, setOpenQuestionsDrawer] = useState(false);

  const toggleQuestionsDrawer = (newOpenQuestionsDrawer: boolean) => () => {
    setOpenQuestionsDrawer(newOpenQuestionsDrawer);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-10 w-full bg-common-white ${hasScrolled ? "border-b border-b-common-black/10" : ""}`}
    >
      <Container maxWidth="2xl">
        <Stack className="flex-row justify-between pb-5 pt-8">
          <Image alt="Logo" height={32} src="/images/logo.svg" width={32} />
          <Stack className="flex-row gap-4">
            <Button
              className="rounded-3xl hover:bg-common-white"
              variant="outlined"
              onClick={toggleQuestionsDrawer(true)}
            >
              Questions?
            </Button>
            <Drawer
              anchor="right"
              classes={{ paper: "w-[23.4375rem]" }}
              className="w-96"
              open={openQuestionsDrawer}
              onClose={toggleQuestionsDrawer(false)}
            >
              <QuestionsDrawer onClose={toggleQuestionsDrawer(false)} />
            </Drawer>
            <Button
              className="rounded-3xl hover:bg-common-white"
              variant="outlined"
            >
              Exit
            </Button>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

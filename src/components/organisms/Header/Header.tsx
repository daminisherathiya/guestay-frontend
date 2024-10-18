"use client";

import Image from "next/image";

import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Drawer } from "@/components/atoms/Drawer";
import { Stack } from "@/components/atoms/Stack";
import { LoginDialog } from "@/components/molecules/LoginDialog/LoginDialog";
import { SignUpDialog } from "@/components/molecules/SignUpDialog/SignUpDialog";

import { QuestionsDrawer } from "../QuestionsDrawer/QuestionsDrawer";

import { useHeader } from "./Header.hooks";

export function Header() {
  const {
    handleCloseLoginDialog,
    handleCloseSignUpDialog,
    handleOpenLoginDialog,
    handleOpenSignUpDialog,
    hasScrolled,
    isLoginDialogOpen,
    isSignUpDialogOpen,
    openQuestionsDrawer,
    toggleQuestionsDrawer,
  } = useHeader();
  return (
    <header
      className={`fixed top-0 z-10 w-full bg-common-white ${hasScrolled ? "border-b border-b-common-black/10" : ""}`}
    >
      <Container maxWidth="2xl">
        <Stack className="flex-row items-center justify-between pb-4 pt-6 md:pb-5 md:pt-8">
          <picture>
            <source media="(min-width: 576px)" srcSet="/images/logo.svg" />
            <Image
              alt="Logo"
              className="w-7 sm:w-36"
              height={32}
              src="/images/logoIcon.svg"
              width={140}
            />
          </picture>
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
            <Button
              className="rounded-3xl"
              variant="outlined"
              onClick={handleOpenLoginDialog}
            >
              Login
            </Button>
            <LoginDialog
              handleCloseLoginDialog={handleCloseLoginDialog}
              handleOpenSignUpDialog={handleOpenSignUpDialog}
              isLoginDialogOpen={isLoginDialogOpen}
            />
            <Button
              className="rounded-3xl"
              variant="contained"
              onClick={handleOpenSignUpDialog}
            >
              Sign up
            </Button>
            <SignUpDialog
              handleCloseSignUpDialog={handleCloseSignUpDialog}
              handleOpenLoginDialog={handleOpenLoginDialog}
              isSignUpDialogOpen={isSignUpDialogOpen}
            />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

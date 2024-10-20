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
    hasScrolled,
    loginDialogIsOpen,
    questionsDrawerIsOpen,
    setLoginDialogIsOpenFalse,
    setLoginDialogIsOpenTrue,
    setQuestionsDrawerIsOpenFalse,
    setQuestionsDrawerIsOpenTrue,
    setSignUpDialogIsOpenFalse,
    setSignUpDialogIsOpenTrue,
    signUpDialogIsOpen,
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
              onClick={() => setQuestionsDrawerIsOpenTrue()}
            >
              Questions?
            </Button>
            <Drawer
              anchor="right"
              classes={{ paper: "w-[23.4375rem]" }}
              className="w-96"
              open={questionsDrawerIsOpen}
              onClose={() => setQuestionsDrawerIsOpenFalse()}
            >
              <QuestionsDrawer
                onClose={() => setQuestionsDrawerIsOpenFalse()}
              />
            </Drawer>
            <Button
              className="rounded-3xl hover:bg-common-white"
              variant="outlined"
            >
              Exit
            </Button>
            {/* <Tooltip title="Account settings">
              <Button
                aria-controls={open ? "account-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                className="gap-3 rounded-pill p-2 pl-3 hover:bg-common-white"
                variant="outlined"
                onClick={handleClick}
              >
                <MenuIcon className="size-5" />
                <Avatar className="size-8 bg-common-white text-text-secondary">
                  <UserAccount />
                </Avatar>
              </Button>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              id="account-menu"
              open={open}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              onClick={handleClose}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout />{" "}
                </ListItemIcon>
                Log in
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                Sign up
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                Guestay your home
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ScienceIcon fontSize="small" />
                </ListItemIcon>
                Host an experience
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                Help Centre
              </MenuItem>
            </Menu> */}
            <Button
              className="rounded-3xl"
              variant="outlined"
              onClick={() => {
                setSignUpDialogIsOpenFalse();
                setLoginDialogIsOpenTrue();
              }}
            >
              Login
            </Button>
            <LoginDialog
              handleCloseLoginDialog={setLoginDialogIsOpenFalse}
              handleOpenSignUpDialog={() => {
                setLoginDialogIsOpenFalse();
                setSignUpDialogIsOpenTrue();
              }}
              isLoginDialogOpen={loginDialogIsOpen}
            />
            <Button
              className="rounded-3xl"
              variant="contained"
              onClick={() => {
                setLoginDialogIsOpenFalse();
                setSignUpDialogIsOpenTrue();
              }}
            >
              Sign up
            </Button>
            <SignUpDialog
              handleCloseSignUpDialog={setSignUpDialogIsOpenFalse}
              handleOpenLoginDialog={() => {
                setSignUpDialogIsOpenFalse();
                setLoginDialogIsOpenTrue();
              }}
              isSignUpDialogOpen={signUpDialogIsOpen}
            />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

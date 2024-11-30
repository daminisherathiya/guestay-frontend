"use client";

import Image from "next/image";
import Link from "next/link";

// import HelpIcon from "@mui/icons-material/Help";
// import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import PersonAdd from "@mui/icons-material/PersonAdd";
// import ScienceIcon from "@mui/icons-material/Science";
import { GridMenuIcon } from "@mui/x-data-grid";

import UserAccount from "/public/images/userAccount.svg";

import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
// import { Divider } from "@/components/atoms/Divider";
// import { Drawer } from "@/components/atoms/Drawer";
import { ListItemIcon } from "@/components/atoms/ListItemIcon";
import { Menu } from "@/components/atoms/Menu";
import { MenuItem } from "@/components/atoms/MenuItem";
import { Stack } from "@/components/atoms/Stack";
import { Tooltip } from "@/components/atoms/Tooltip/Tooltip";
import { LoginDialog } from "@/components/molecules/LoginDialog/LoginDialog";
import { Logout } from "@/components/molecules/Logout";
import { ResetPasswordDialog } from "@/components/molecules/ResetPasswordDialog";
import { SignUpDialog } from "@/components/molecules/SignUpDialog/SignUpDialog";
import { getUserInitial } from "@/utils/common";

// import { QuestionsDrawer } from "../QuestionsDrawer/QuestionsDrawer";

import { useHeader } from "./Header.hooks";

export function Header() {
  const {
    accountMenuAnchor,
    closeAccountMenu,
    handleCloseLoginDialog,
    handleCloseSignUpDialog,
    handleOpenLogin,
    handleOpenSignUp,
    isAccountMenuOpen,
    isAuthenticated,
    isScrolled,
    loginDialogIsOpen,
    openAccountMenu,
    // questionsDrawerIsOpen,
    ResetPasswordDialogIsOpen,
    // setLoginDialogIsOpenFalse,
    // setLoginDialogIsOpenTrue,
    // setQuestionsDrawerIsOpenFalse,
    // setQuestionsDrawerIsOpenTrue,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
    // setSignUpDialogIsOpenFalse,
    // setSignUpDialogIsOpenTrue,
    showExitButton,
    signUpDialogIsOpen,
    userDetails,
  } = useHeader();

  return (
    <header
      className={`fixed top-0 z-10 w-full bg-common-white ${isScrolled ? "border-b border-b-common-black/10" : ""}`}
    >
      <Container maxWidth="2xl">
        <Stack className="flex-row items-center justify-between py-4 md:py-5">
          <Link className="shrink-0" href="/">
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
          </Link>
          <Stack className="flex-row gap-2 xs:gap-4">
            {/* <Button
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
            </Drawer> */}
            {showExitButton && (
              <Button
                className="rounded-3xl hover:bg-common-white"
                component={Link}
                href="/become-a-host"
                variant="outlined"
              >
                Exit
              </Button>
            )}
            <Tooltip title="Account settings">
              <Button
                aria-controls={isAccountMenuOpen ? "account-menu" : undefined}
                aria-expanded={isAccountMenuOpen ? "true" : undefined}
                aria-haspopup="true"
                className="min-w-0 gap-3 rounded-pill border-0 p-0 hover:bg-common-white xs:min-w-16 xs:border xs:p-2 xs:pl-3"
                variant="outlined"
                onClick={openAccountMenu}
              >
                <GridMenuIcon className="hidden size-5 xs:block" />
                <Avatar
                  className={`size-9 xs:size-8 ${!isAuthenticated ? "bg-common-white text-text-secondary" : "bg-primary-main text-sm text-common-white"}`}
                >
                  {!isAuthenticated ? (
                    <UserAccount />
                  ) : (
                    getUserInitial(userDetails?.fname as string)
                  )}
                </Avatar>
              </Button>
            </Tooltip>
            <Menu
              anchorEl={accountMenuAnchor}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              id="account-menu"
              open={isAccountMenuOpen}
              slotProps={{
                paper: {
                  className:
                    "mt-3 overflow-visible drop-shadow-elevated before:absolute before:right-3.5 before:top-0 before:z-0 before:block before:size-2.5 before:-translate-y-1/2 before:rotate-45 before:bg-background-paper",
                  elevation: 0,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              onClick={closeAccountMenu}
              onClose={closeAccountMenu}
            >
              {!isAuthenticated && [
                <MenuItem key="Sign up" onClick={handleOpenSignUp}>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  Sign up
                </MenuItem>,
                <MenuItem key="Log in" onClick={handleOpenLogin}>
                  <ListItemIcon>
                    <LogoutIcon />{" "}
                  </ListItemIcon>
                  Log in
                </MenuItem>,
              ]}
              {isAuthenticated && (
                <>
                  <MenuItem key="User profile">
                    <ListItemIcon>
                      <PersonIcon />{" "}
                    </ListItemIcon>
                    {userDetails?.fname} {userDetails?.lname}
                  </MenuItem>
                  <MenuItem
                    key="Reset password"
                    onClick={() => {
                      setResetPasswordDialogIsOpenTrue();
                    }}
                  >
                    <ListItemIcon>
                      <PasswordIcon />{" "}
                    </ListItemIcon>
                    Change Password
                  </MenuItem>
                </>
              )}
              {isAuthenticated && <Logout />}
              {/* <Divider />
              <MenuItem onClick={closeAccountMenu}>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                Guestay your home
              </MenuItem>
              <MenuItem onClick={closeAccountMenu}>
                <ListItemIcon>
                  <ScienceIcon fontSize="small" />
                </ListItemIcon>
                Host an experience
              </MenuItem>
              <MenuItem onClick={closeAccountMenu}>
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                Help Centre
              </MenuItem> */}
            </Menu>
            <LoginDialog
              handleCloseLoginDialog={handleCloseLoginDialog}
              handleOpenLoginDialog={handleOpenLogin}
              handleOpenSignUpDialog={handleOpenSignUp}
              isLoginDialogOpen={loginDialogIsOpen}
            />
            <SignUpDialog
              handleCloseSignUpDialog={handleCloseSignUpDialog}
              handleOpenLoginDialog={handleOpenLogin}
              isSignUpDialogOpen={signUpDialogIsOpen}
            />
            <ResetPasswordDialog
              handleCloseResetPasswordDialog={setResetPasswordDialogIsOpenFalse}
              isResetPasswordDialogOpen={ResetPasswordDialogIsOpen}
            />
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

"use client";

import { useEffect } from "react";
import React, { useCallback } from "react";

import { usePathname } from "next/navigation";

import { useAuthentication } from "@/hooks/useAuthentication";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";

import { LOGIN_HASH_STR, SIGNUP_HASH_STR } from "./Header.consts";

export const useHeader = () => {
  const { isAuthenticated, userDetails } = useAuthentication();

  const {
    value: isScrolled,
    setTrue: setIsScrolledTrue,
    setFalse: setIsScrolledFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: questionsDrawerIsOpen,
    setTrue: setQuestionsDrawerIsOpenTrue,
    setFalse: setQuestionsDrawerIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: signUpDialogIsOpen,
    setTrue: setSignUpDialogIsOpenTrue,
    setFalse: setSignUpDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: loginDialogIsOpen,
    setTrue: setLoginDialogIsOpenTrue,
    setFalse: setLoginDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: ResetPasswordDialogIsOpen,
    setTrue: setResetPasswordDialogIsOpenTrue,
    setFalse: setResetPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolledTrue();
      } else {
        setIsScrolledFalse();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsScrolledFalse, setIsScrolledTrue]);

  const [accountMenuAnchor, setAccountMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const isAccountMenuOpen = Boolean(accountMenuAnchor);
  const openAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };
  const closeAccountMenu = () => {
    setAccountMenuAnchor(null);
  };

  const handleOpenLoginDialog = useCallback(() => {
    setSignUpDialogIsOpenFalse();
    setLoginDialogIsOpenTrue();
  }, [setSignUpDialogIsOpenFalse, setLoginDialogIsOpenTrue]);

  const handleOpenSignUpDialog = useCallback(() => {
    setLoginDialogIsOpenFalse();
    setSignUpDialogIsOpenTrue();
  }, [setLoginDialogIsOpenFalse, setSignUpDialogIsOpenTrue]);

  const clearHash = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const handleCloseLoginDialog = useCallback(() => {
    setLoginDialogIsOpenFalse();
    clearHash();
  }, [clearHash, setLoginDialogIsOpenFalse]);

  const handleCloseSignUpDialog = useCallback(() => {
    setSignUpDialogIsOpenFalse();
    clearHash();
  }, [clearHash, setSignUpDialogIsOpenFalse]);

  useEffect(() => {
    const hash = window.location.hash;

    if (isAuthenticated === true) {
      if (hash === LOGIN_HASH_STR || hash === SIGNUP_HASH_STR) {
        clearHash();
      }
    } else if (isAuthenticated === false) {
      if (hash === LOGIN_HASH_STR) {
        handleOpenLoginDialog();
      } else if (hash === SIGNUP_HASH_STR) {
        handleOpenSignUpDialog();
      } else {
        handleOpenLoginDialog();
      }
    }
  }, [
    clearHash,
    handleOpenLoginDialog,
    handleOpenSignUpDialog,
    isAuthenticated,
  ]);

  ////////

  const pathname = usePathname();

  const showExitButton = pathname?.startsWith("/become-a-host/");

  return {
    accountMenuAnchor,
    closeAccountMenu,
    handleCloseLoginDialog,
    handleCloseSignUpDialog,
    handleOpenLoginDialog,
    handleOpenSignUpDialog,
    isAccountMenuOpen,
    isAuthenticated,
    isScrolled,
    loginDialogIsOpen,
    openAccountMenu,
    questionsDrawerIsOpen,
    ResetPasswordDialogIsOpen,
    // setLoginDialogIsOpenFalse,
    // setLoginDialogIsOpenTrue,
    setQuestionsDrawerIsOpenFalse,
    setQuestionsDrawerIsOpenTrue,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
    // setSignUpDialogIsOpenFalse,
    // setSignUpDialogIsOpenTrue,
    showExitButton,
    signUpDialogIsOpen,
    userDetails,
  };
};

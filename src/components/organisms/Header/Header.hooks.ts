import { useEffect } from "react";

import { useAuthentication } from "@/hooks/useAuthentication";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export const useHeader = () => {
  const { isAuthenticated, userDetails } = useAuthentication();

  const {
    value: hasScrolled,
    setTrue: setHasScrolledTrue,
    setFalse: setHasScrolledFalse,
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
        setHasScrolledTrue();
      } else {
        setHasScrolledFalse();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setHasScrolledFalse, setHasScrolledTrue]);

  return {
    hasScrolled,
    isAuthenticated,
    loginDialogIsOpen,
    questionsDrawerIsOpen,
    ResetPasswordDialogIsOpen,
    setLoginDialogIsOpenFalse,
    setLoginDialogIsOpenTrue,
    setQuestionsDrawerIsOpenFalse,
    setQuestionsDrawerIsOpenTrue,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
    setSignUpDialogIsOpenFalse,
    setSignUpDialogIsOpenTrue,
    signUpDialogIsOpen,
    userDetails,
  };
};

import { useEffect } from "react";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export const useHeader = () => {
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
    loginDialogIsOpen,
    questionsDrawerIsOpen,
    setLoginDialogIsOpenFalse,
    setLoginDialogIsOpenTrue,
    setQuestionsDrawerIsOpenFalse,
    setQuestionsDrawerIsOpenTrue,
    setSignUpDialogIsOpenFalse,
    setSignUpDialogIsOpenTrue,
    signUpDialogIsOpen,
  };
};

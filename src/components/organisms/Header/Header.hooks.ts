import { useCallback, useEffect, useState } from "react";

export const useHeader = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openQuestionsDrawer, setOpenQuestionsDrawer] = useState(false);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const toggleQuestionsDrawer = (newOpenQuestionsDrawer: boolean) => () => {
    setOpenQuestionsDrawer(newOpenQuestionsDrawer);
  };

  const handleCloseSignUpDialog = useCallback(() => {
    setSignUpDialogOpen(false);
  }, []);

  const handleCloseLoginDialog = useCallback(() => {
    setLoginDialogOpen(false);
  }, []);

  const handleOpenSignUpDialog = useCallback(() => {
    handleCloseLoginDialog();
    setSignUpDialogOpen(true);
  }, [handleCloseLoginDialog]);

  const handleOpenLoginDialog = useCallback(() => {
    handleCloseSignUpDialog();
    setLoginDialogOpen(true);
  }, [handleCloseSignUpDialog]);

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

  return {
    handleCloseLoginDialog,
    handleCloseSignUpDialog,
    handleOpenLoginDialog,
    handleOpenSignUpDialog,
    hasScrolled,
    isLoginDialogOpen,
    isSignUpDialogOpen,
    openQuestionsDrawer,
    toggleQuestionsDrawer,
  };
};

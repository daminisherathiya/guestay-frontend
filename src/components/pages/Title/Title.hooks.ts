import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function useTitle() {
  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
  } = usePropertyToEdit();

  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setTitle(propertyApiData?.data[0]?.title || "");
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 32) {
      setTitle(newValue);
    } else {
      setTitle(newValue.slice(0, 32));
    }
  };

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "title",
        propertyId: getPropertyIdToEdit() as string,
        title: title,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    Footer,
    handleTitleChange,
    isLoading,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    title,
  };
}

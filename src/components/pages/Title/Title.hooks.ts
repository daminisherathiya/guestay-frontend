import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useTitle() {
  const { propertyId }: { propertyId: string } = useParams();

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
      setTitle(propertyApiData?.data?.property[0].title || "");
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 55) {
      setTitle(newValue);
    } else {
      setTitle(newValue.slice(0, 55));
    }
  };

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "title",
        propertyId: propertyId,
        title: title,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading || title.trim().length === 0,
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

import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useTitle() {
  const {
    control,
    formState: { isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const titleValue = watch("title");
  const titleLength = titleValue.length;

  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
  } = usePropertyToEdit();

  useEffect(() => {
    if (propertyApiIsSuccess) {
      reset({
        title: propertyApiData?.data?.property[0].title || "",
      });
    }
  }, [propertyApiIsSuccess, propertyApiData, reset]);

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "title",
        propertyId: propertyId,
        title: titleValue,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading || titleValue.trim().length === 0 || !isValid,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    control,
    Footer,
    isLoading,
    titleLength,
  };
}

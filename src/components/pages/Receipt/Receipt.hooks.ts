import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { PropertyType } from "@/apis/property/propertyApi/propertyApi.type";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function useReceipt() {
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

  const [property, setProperty] = useState<PropertyType | null>(null);

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setProperty(propertyApiData?.data.property[0] || null);
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const {
    value: fullReceiptPreviewDialogIsOpen,
    setTrue: setFullReceiptPreviewDialogIsOpenTrue,
    setFalse: setFullReceiptPreviewDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "draft",
        propertyId: getPropertyIdToEdit() as string,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    buttonText: "Publish",
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
    fullReceiptPreviewDialogIsOpen,
    property,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setFullReceiptPreviewDialogIsOpenFalse,
    setFullReceiptPreviewDialogIsOpenTrue,
  };
}

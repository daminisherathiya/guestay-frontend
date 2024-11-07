import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { PropertyType } from "@/apis/property/propertyApi/propertyApi.types";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useReceipt() {
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
        propertyId: propertyId,
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
    isLoading,
    property,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setFullReceiptPreviewDialogIsOpenFalse,
    setFullReceiptPreviewDialogIsOpenTrue,
  };
}

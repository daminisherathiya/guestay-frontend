import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { propertyTypeApi } from "@/apis/property/propertyTypeApi";
import { propertyTypeApiResponseType } from "@/apis/property/propertyTypeApi/propertyTypeApi.type";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function useStructure() {
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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  console.log("🚀 ~ useStructure ~ selectedOption:", selectedOption);

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setSelectedOption(propertyApiData?.data[0]?.type || null);
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const handleOptionSelection = (value: string) => {
    setSelectedOption(value);
  };

  ////////

  const {
    data: propertyTypeApiData,
    isFirstLoading: propertyTypeApiIsFirstLoading,
    SnackbarAlert: PropertyTypeApiSnackbarAlert,
  } = useQuery<propertyTypeApiResponseType, Error, propertyTypeApiResponseType>(
    {
      initialData: { data: [] },
      queryFn: () => {
        return propertyTypeApi({ data: { userId: getUserDetails().id } });
      },
      queryKey: ["property-type"],
    },
  );

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "type",
        propertyId: getPropertyIdToEdit() as string,
        type: selectedOption as string,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading =
    propertyApiIsFirstLoading ||
    propertyTypeApiIsFirstLoading ||
    !selectedOption;

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
    handleOptionSelection,
    isLoading,
    PropertyApiSnackbarAlert,
    propertyTypeApiData,
    PropertyTypeApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    selectedOption,
  };
}

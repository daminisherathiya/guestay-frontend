import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { propertyTypeApi } from "@/apis/property/propertyTypeApi";
import { propertyTypeApiResponseType } from "@/apis/property/propertyTypeApi/propertyTypeApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useStructure() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
  } = usePropertyToEdit();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  console.log("🚀 ~ useStructure ~ selectedOption:", selectedOption);

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setSelectedOption(propertyApiData?.data.property[0].type || null);
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const handleOptionSelection = (value: string) => {
    setSelectedOption(value);
  };

  ////////

  const {
    data: propertyTypeApiData,
    isFirstLoading: propertyTypeApiIsFirstLoading,
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
        propertyId: propertyId,
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
    propertyTypeApiData,
    selectedOption,
  };
}

import { useState } from "react";

import { propertyTypeApi } from "@/apis/property/propertyTypeApi";
import { propertyTypeApiResponseType } from "@/apis/property/propertyTypeApi/propertyTypeApi.type";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useStructure() {
  const {
    data: propertyTypeApiData,
    isFirstLoading: propertyTypeApiIsFirstLoading,
    isSuccess: propertyTypeApiIsSuccess,
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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
  };

  return {
    handleButtonClick,
    propertyTypeApiData,
    propertyTypeApiIsFirstLoading,
    PropertyTypeApiSnackbarAlert,
    selectedOption,
  };
}

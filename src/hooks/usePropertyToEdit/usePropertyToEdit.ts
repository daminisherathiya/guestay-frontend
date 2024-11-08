import { useParams } from "next/navigation";

import { propertyApi } from "@/apis/property/propertyApi";
import { propertyApiResponseType } from "@/apis/property/propertyApi/propertyApi.types";
import { savePropertyApi } from "@/apis/property/savePropertyApi";
import {
  SavePropertyAPIResponseType,
  SavePropertyApiType,
} from "@/apis/property/savePropertyApi/savePropertyApi.types";
import { useQuery } from "@/hooks//useQuery";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function usePropertyToEdit() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    data: propertyApiData,
    isFirstLoading: propertyApiIsFirstLoading,
    isSuccess: propertyApiIsSuccess,
    SnackbarAlert: PropertyApiSnackbarAlert,
  } = useQuery<propertyApiResponseType, Error, propertyApiResponseType>({
    queryFn: () => {
      return propertyApi({
        data: {
          propertyId: propertyId,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["property", propertyId],
  });

  const {
    mutate: savePropertyApiMutate,
    isPending: savePropertyApiIsPending,
    isSuccess: savePropertyApiIsSuccess,
    SnackbarAlert: SavePropertyApiSnackbarAlert,
  } = useMutation<SavePropertyAPIResponseType, Error, SavePropertyApiType>({
    mutationFn: savePropertyApi,
    mutationKey: ["save-property"],
  });

  return {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
  };
}

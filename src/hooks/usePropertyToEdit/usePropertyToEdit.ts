import { propertyApi } from "@/apis/property/propertyApi";
import { propertyApiResponseType } from "@/apis/property/propertyApi/propertyApi.type";
import { savePropertyApi } from "@/apis/property/savePropertyApi";
import {
  SavePropertyAPIResponseType,
  SavePropertyApiType,
} from "@/apis/property/savePropertyApi/savePropertyApi.types";
import { useQuery } from "@/hooks//useQuery";
import { useMutation } from "@/hooks/useMutation";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function usePropertyToEdit() {
  const {
    data: propertyApiData,
    isFirstLoading: propertyApiIsFirstLoading,
    isSuccess: propertyApiIsSuccess,
    SnackbarAlert: PropertyApiSnackbarAlert,
  } = useQuery<propertyApiResponseType, Error, propertyApiResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return propertyApi({
        data: {
          propertyId: getPropertyIdToEdit() as string,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["property", getPropertyIdToEdit()],
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

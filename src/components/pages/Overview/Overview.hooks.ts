import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { savePropertyApi } from "@/apis/property/savePropertyApi";
import {
  SavePropertyAPIResponseType,
  SavePropertyApiType,
} from "@/apis/property/savePropertyApi/savePropertyApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useOverview() {
  const {
    mutate: savePropertyApiMutate,
    data: savePropertyApiData,
    isPending: savePropertyApiIsPending,
    isSuccess: savePropertyApiIsSuccess,
  } = useMutation<SavePropertyAPIResponseType, Error, SavePropertyApiType>({
    mutationFn: savePropertyApi,
    mutationKey: ["save-property"],
  });

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        listingStep: "new",
        userId: getUserDetails().id,
      },
    });
  };

  const { Footer, nextUrl } = useFooterProgressBar({
    buttonText: "Get started",
    isDisabled: false,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(
        nextUrl.replace("undefined", savePropertyApiData.data.recordId),
      );
    }
  }, [nextUrl, router, savePropertyApiIsSuccess, savePropertyApiData]);

  return { Footer };
}

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { bedTypesApi } from "@/apis/property/bedTypesApi";
import { bedTypesApiResponseType } from "@/apis/property/bedTypesApi/bedTypesApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { BEDROOMS_INITIAL_VALUE } from "./FloorPlan.consts";
import {
  BedroomFormValues,
  BedroomsFromGetPropertyAPI,
} from "./FloorPlan.types";

export function useFloorPlan() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
  } = usePropertyToEdit();

  const [bedroomsCounters, setBedroomsCounters] = useState<number>(1);
  const [cribsCounters, setCribsCounters] = useState<number>(0);

  const {
    control,
    reset,
    setValue,
    watch,
    getValues,
    formState: { isValid },
  } = useForm<BedroomFormValues>({
    defaultValues: {
      bedrooms: BEDROOMS_INITIAL_VALUE,
    },
    mode: "onChange",
  });

  const bedrooms = watch("bedrooms") || [];

  const handleAddBedroom = () => {
    const newBedroom = {
      bed_count: "1",
      display_order: String(bedrooms.length),
      name: `Bedroom ${bedrooms.length + 1}`,
      type: BEDROOMS_INITIAL_VALUE[0].type,
    };
    setValue("bedrooms", [...bedrooms, newBedroom]);
  };

  const handleRemoveBedroom = (index: number) => {
    const newBedrooms = bedrooms.filter((_, i) => i !== index);
    setValue("bedrooms", newBedrooms);
  };

  const {
    data: bedTypesApiData,
    isFirstLoading: bedTypesApiIsFirstLoading,
    isSuccess: bedTypesApiIsSuccess,
  } = useQuery<bedTypesApiResponseType, Error, bedTypesApiResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return bedTypesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["bed-type"],
  });

  useEffect(() => {
    if (bedTypesApiIsSuccess && propertyApiIsSuccess) {
      const firstBedType = bedTypesApiData.data[0];
      if (firstBedType) {
        BEDROOMS_INITIAL_VALUE[0].type = [firstBedType];
      }

      ////////

      setBedroomsCounters(
        propertyApiData?.data?.property[0].baths
          ? Number(propertyApiData?.data?.property[0].baths)
          : 0,
      );
      setCribsCounters(
        propertyApiData?.data?.property[0].cribs
          ? Number(propertyApiData?.data?.property[0].cribs)
          : 0,
      );
      const propertyBedroomsFromGetPropertyAPI: BedroomsFromGetPropertyAPI =
        JSON.parse(propertyApiData?.data?.property[0]?.bedrooms_info || "[]");

      let propertyBedrooms: BedroomFormValues["bedrooms"] =
        propertyBedroomsFromGetPropertyAPI.map((bedroom) => {
          const updatedTypes = bedroom.type.map((bedTypeItem) => {
            const found = bedTypesApiData.data.find(
              (apiItem) => apiItem.id === bedTypeItem.id,
            );

            return {
              ...bedTypeItem,
              icon: found?.icon ?? "",
              title: found?.title ?? "",
            };
          });

          return {
            ...bedroom,
            type: updatedTypes,
          };
        });

      propertyBedrooms = propertyBedrooms.length
        ? propertyBedrooms
        : BEDROOMS_INITIAL_VALUE;
      reset({ bedrooms: propertyBedrooms });
    }
  }, [
    bedTypesApiData,
    bedTypesApiIsSuccess,
    propertyApiData,
    propertyApiIsSuccess,
    reset,
  ]);

  ////////

  const router = useRouter();

  const onSubmit = () => {
    const formValues = getValues();
    const bedrooms = formValues.bedrooms || [];
    savePropertyApiMutate({
      data: {
        baths: bedroomsCounters,
        bedrooms: bedrooms.reduce(
          (total, bedroom) => total + Number(bedroom.bed_count),
          0,
        ),
        bedroomsInfo: JSON.stringify(bedrooms),
        beds: bedrooms.reduce((total, bedroom) => {
          const numOfBeds = bedroom.type.reduce(
            (sum, bedType) => sum + Number(bedType.num_of_beds),
            0,
          );
          return total + numOfBeds;
        }, 0),
        cribs: cribsCounters,
        listingStep: "bedroom_info",
        noOfChildren: cribsCounters,
        noOfCouples: bedrooms.reduce((total, bedroom) => {
          const coupleBeds = bedroom.type.filter(
            (bedType) => bedType.num_of_people === "2",
          ).length;
          return total + coupleBeds;
        }, 0),
        numOfPeople: bedrooms.reduce((total, bedroom) => {
          const numOfPeople = bedroom.type.reduce(
            (sum, bedType) => sum + Number(bedType.num_of_people),
            0,
          );
          return total + numOfPeople;
        }, 0),
        propertyId: propertyId,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading || bedTypesApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading || !isValid,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    bedrooms,
    bedroomsCounters,
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    control,
    cribsCounters,
    Footer,
    handleAddBedroom,
    handleRemoveBedroom,
    isLoading,
    setBedroomsCounters,
    setCribsCounters,
  };
}

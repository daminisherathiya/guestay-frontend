import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useFieldArray, useForm } from "react-hook-form";

import { bedTypesApi } from "@/apis/property/bedTypesApi";
import { bedTypesApiResponseType } from "@/apis/property/bedTypesApi/bedTypesApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { BedroomFormValues, CounterState } from "./FloorPlan.types";

export function useFloorPlan() {
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

  const [counters, setCounters] = useState<CounterState>({
    bathrooms: 0,
    cribs: 0,
  });
  console.log("🚀 ~ useFloorPlan ~ counters:", counters);

  const handleIncrease = (field: keyof CounterState, maxLimit: number) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 1
              : prevCounters[field],
        };
      }
    });
  };

  const handleDecrease = (field: keyof CounterState) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 1
              : prevCounters[field],
        };
      }
    });
  };

  const displayValue = (value: number) => {
    return value;
  };

  const { control, watch, reset } = useForm<BedroomFormValues>({
    defaultValues: {
      bedrooms: [
        {
          bed_count: "1",
          display_order: "0",
          name: "Bedroom 1",
          type: [],
        },
      ],
    },
    mode: "onChange",
  });

  const {
    fields: bedrooms,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "bedrooms",
  });
  console.log("🚀 ~ useFloorPlan ~ bedrooms:", bedrooms);

  const handleAddBedroom = () => {
    append({
      bed_count: "1",
      display_order: String(bedrooms.length),
      name: `Bedroom ${bedrooms.length + 1}`,
      type: [],
    });
  };

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setCounters({
        bathrooms: propertyApiData?.data?.property[0].baths
          ? Number(propertyApiData?.data?.property[0].baths)
          : 0,
        cribs: propertyApiData?.data?.property[0].cribs
          ? Number(propertyApiData?.data?.property[0].cribs)
          : 0,
      });
      const bedrooms = JSON.parse(
        propertyApiData?.data?.property[0]?.bedrooms_info || "[]",
      );
      console.log("🚀 ~ useEffect ~ bedrooms:", bedrooms);
      reset({ bedrooms: bedrooms });
    }
  }, [propertyApiData, propertyApiIsSuccess, reset]);

  ////////

  const {
    data: bedTypesApiData,
    isFirstLoading: bedTypesApiIsFirstLoading,
    SnackbarAlert: BedTypesApiSnackbarAlert,
  } = useQuery<bedTypesApiResponseType, Error, bedTypesApiResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return bedTypesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["bed-type"],
  });

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        baths: counters.bathrooms,
        bedrooms: bedrooms.reduce((total, bedroom) => {
          return total + bedroom.bed_count !== "0" ? 1 : 0;
        }, 0),
        bedroomsInfo: JSON.stringify(bedrooms),
        beds: bedrooms.reduce((total, bedroom) => {
          return total + Number(bedroom.bed_count);
        }, 0),
        cribs: counters.cribs,
        listingStep: "bedroom_info",
        noOfChildren: counters.cribs,
        noOfCouples: bedrooms.reduce((total, bedroom) => {
          const coupleBeds = bedroom.type.filter(
            (bedType) => bedType.num_of_people === "2",
          ).length;
          return total + coupleBeds;
        }, 0),
        numOfPeople: bedrooms.reduce((total, bedroom) => {
          const coupleBeds = bedroom.type.filter(
            (bedType) => bedType.num_of_people !== "2",
          ).length;
          return total + coupleBeds;
        }, 0),
        propertyId: propertyId,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading || bedTypesApiIsFirstLoading;
  // const isLoading =
  //   propertyApiIsFirstLoading || bedTypesApiIsFirstLoading || !selectedOption;

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
    bedrooms,
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    BedTypesApiSnackbarAlert,
    control,
    counters,
    displayValue,
    Footer,
    handleAddBedroom,
    handleDecrease,
    handleIncrease,
    isLoading,
    PropertyApiSnackbarAlert,
    remove,
    SavePropertyApiSnackbarAlert,
  };
}

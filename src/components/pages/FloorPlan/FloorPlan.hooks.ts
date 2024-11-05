import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useFieldArray, useForm } from "react-hook-form";

import { bedTypesApi } from "@/apis/property/bedTypesApi";
import { bedTypesApiResponseType } from "@/apis/property/bedTypesApi/bedTypesApi.type";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

import { BedroomFormValues, CounterState } from "./FloorPlan.type";

export function useFloorPlan() {
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

  const displayValue = (
    value: number,
    // max: number,
    // field: keyof CounterState,
  ) => {
    return value;
    // return field === "guests" && value === max ? `${value}+` : value;
  };

  const { control, watch, setValue } = useForm<BedroomFormValues>({
    defaultValues: {
      bedrooms: [
        {
          bedroomCount: "1",
          bedroomName: "Bedroom 1",
          bedroomTypes: [],
          displayOrder: "0",
        },
      ],
    },
    mode: "onChange",
  });
  const watchedBedrooms = watch("bedrooms") as BedroomFormValues["bedrooms"];
  console.log("🚀 ~ Watched Bedrooms:", watchedBedrooms);

  const {
    fields: bedrooms,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "bedrooms",
  });

  const handleAddBedroom = () => {
    console.log("🚀 ~ handleAddBedroom ~ bedrooms.length:", bedrooms.length);
    append({
      bedroomCount: "1",
      bedroomName: `Bedroom ${bedrooms.length + 1}`,
      bedroomTypes: [],
      displayOrder: String(bedrooms.length),
    });
  };

  useEffect(() => {
    if (propertyApiIsSuccess) {
      console.log(
        "🚀 ~ useEffect ~ propertyApiData:",
        propertyApiData?.data[0],
      );
      setCounters({
        bathrooms: propertyApiData?.data[0]?.bedrooms
          ? Number(propertyApiData?.data[0]?.bedrooms)
          : 0,
        cribs: propertyApiData?.data[0]?.cribs
          ? Number(propertyApiData?.data[0]?.cribs)
          : 0,
      });
      setValue(
        "bedrooms",
        JSON.parse(propertyApiData?.data[0]?.bedrooms_info || "[]"),
      );
    }
  }, [propertyApiData, propertyApiIsSuccess, setValue]);

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
        bedrooms: watchedBedrooms.length,
        bedroomsInfo: JSON.stringify(watchedBedrooms),
        beds: watchedBedrooms.reduce((total, bedroom) => {
          return total + Number(bedroom.bedroomCount);
        }, 0),
        cribs: counters.cribs,
        listingStep: "bedroom_info",
        noOfChildren: counters.cribs,
        noOfCouples: watchedBedrooms.reduce((total, bedroom) => {
          const coupleBeds = bedroom.bedroomTypes.filter(
            (bedType) => bedType.num_of_people === "2",
          ).length;
          return total + coupleBeds;
        }, 0),
        numOfPeople: watchedBedrooms.reduce((total, bedroom) => {
          const coupleBeds = bedroom.bedroomTypes.filter(
            (bedType) => bedType.num_of_people !== "2",
          ).length;
          return total + coupleBeds;
        }, 0),
        propertyId: getPropertyIdToEdit() as string,
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
    PropertyApiSnackbarAlert,
    remove,
    SavePropertyApiSnackbarAlert,
  };
}

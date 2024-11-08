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

  const handleIncrease = (field: keyof CounterState, maxLimit: number) => {
    setCounters((prevCounters) => {
      const increment = field === "bathrooms" ? 0.5 : 1;
      return {
        ...prevCounters,
        [field]:
          prevCounters[field] < maxLimit
            ? prevCounters[field] + increment
            : prevCounters[field],
      };
    });
  };

  const handleDecrease = (field: keyof CounterState) => {
    setCounters((prevCounters) => {
      const decrement = field === "bathrooms" ? 0.5 : 1;
      return {
        ...prevCounters,
        [field]:
          prevCounters[field] > 0
            ? prevCounters[field] - decrement
            : prevCounters[field],
      };
    });
  };

  const displayValue = (value: number) => value;

  const { control, reset, setValue, watch, getValues } =
    useForm<BedroomFormValues>({
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
      type: [],
    };
    setValue("bedrooms", [...bedrooms, newBedroom]);
  };

  const handleRemoveBedroom = (index: number) => {
    const newBedrooms = bedrooms.filter((_, i) => i !== index);
    setValue("bedrooms", newBedrooms);
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
      let propertyBedrooms = JSON.parse(
        propertyApiData?.data?.property[0]?.bedrooms_info || "[]",
      );
      propertyBedrooms = propertyBedrooms.length
        ? propertyBedrooms
        : BEDROOMS_INITIAL_VALUE;
      console.log("🚀 ~ useEffect ~ propertyBedrooms:", propertyBedrooms);
      reset({ bedrooms: propertyBedrooms });
    }
  }, [propertyApiData, propertyApiIsSuccess, reset]);

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
    const formValues = getValues();
    const bedrooms = formValues.bedrooms || [];
    savePropertyApiMutate({
      data: {
        baths: counters.bathrooms,
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
    handleRemoveBedroom,
    isLoading,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
  };
}

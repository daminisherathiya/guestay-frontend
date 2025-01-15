import { useForm } from "react-hook-form";

export function useAddCustomTripDates() {
  const { control } = useForm({
    defaultValues: {
      minimumNightsStay: "",
    },
  });
  return { control };
}

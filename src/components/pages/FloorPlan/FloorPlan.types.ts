import { bedTypeType } from "@/apis/property/bedTypesApi/bedTypesApi.types";

export interface BedroomFormValues {
  bedrooms: {
    bed_count: string;
    display_order: string;
    name: string;
    type: bedTypeType[];
  }[];
}

export type BedroomsFromGetPropertyAPI = {
  bed_count: string;
  display_order: string;
  name: string;
  type: Pick<bedTypeType, "id" | "num_of_beds" | "num_of_people">[];
}[];

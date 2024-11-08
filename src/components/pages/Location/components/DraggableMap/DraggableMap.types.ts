import { LocationType } from "@/apis/property/locationsApi/locationsApi.types";

export interface DraggableMapProps {
  latitude: number | null;
  location: LocationType;
  locationHasChanged: boolean;
  longitude: number | null;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

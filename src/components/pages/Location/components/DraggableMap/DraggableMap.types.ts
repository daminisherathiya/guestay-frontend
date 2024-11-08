export interface DraggableMapProps {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (value: number) => void;
  setLongitude: (value: number) => void;
}

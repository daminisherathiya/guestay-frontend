import React, { useEffect, useRef, useState } from "react";

import { Box } from "@/components/atoms/Box";
import { useBoolean } from "@/hooks/useBoolean";

import { INITIAL_MAP_POSITION } from "./DraggableMap.consts";
import { DraggableMapProps } from "./DraggableMap.types";

const DraggableMap = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}: DraggableMapProps) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markerInstance, setMarkerInstance] =
    useState<google.maps.Marker | null>(null);
  const { value: mapCenterInitialized, setTrue: setMapCenterInitializedTrue } =
    useBoolean({
      initialValue: false,
    });

  useEffect(() => {
    const initializeGoogleServices = () => {
      if (typeof window !== "undefined" && window.google && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: INITIAL_MAP_POSITION,
          zoom: 6,
        });

        const marker = new google.maps.Marker({
          draggable: true,
          map: map,
          position: INITIAL_MAP_POSITION,
          title: "Drag Me",
        });

        // Set the map and marker instances to state for later reference
        setMapInstance(map);
        setMarkerInstance(marker);

        // Add drag event listeners
        marker.addListener("drag", (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            setLatitude(event.latLng.lat());
            setLongitude(event.latLng.lng());
          }
        });

        marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            setLatitude(event.latLng.lat());
            setLongitude(event.latLng.lng());
          }
        });
      }
    };

    // Check if Google Maps API is loaded, retry every 100ms until it’s available
    const intervalId = setInterval(() => {
      if (window.google) {
        initializeGoogleServices();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [setLatitude, setLongitude]);

  useEffect(() => {
    if (
      !mapCenterInitialized &&
      latitude !== null &&
      longitude !== null &&
      mapInstance &&
      markerInstance
    ) {
      const newPosition = { lat: latitude, lng: longitude };
      mapInstance.setCenter(newPosition);
      markerInstance.setPosition(newPosition);
      setMapCenterInitializedTrue();
    }
  }, [
    latitude,
    longitude,
    mapCenterInitialized,
    mapInstance,
    markerInstance,
    setMapCenterInitializedTrue,
  ]);

  return <Box ref={mapRef} className="h-[31.25rem] rounded-lg" />;
};

export default DraggableMap;

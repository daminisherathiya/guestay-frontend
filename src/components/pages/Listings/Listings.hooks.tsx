import { useCallback, useEffect, useRef, useState } from "react";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import {
  ListingPropertiesType,
  listingPropertiesApiResponseType,
} from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { locationsApi } from "@/apis/property/locationsApi";
import { locationsAPIResponseType } from "@/apis/property/locationsApi/locationsApi.types";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle/useToggle";
import {
  getSelectedListingsView,
  getUserDetails,
  setSelectedListingsView,
} from "@/utils/localStorage/localStorage";

export function useListings() {
  const {
    data: listingPropertiesApiData,
    isFirstLoading: listingPropertiesApiIsFirstLoading,
  } = useQuery<
    listingPropertiesApiResponseType,
    Error,
    listingPropertiesApiResponseType
  >({
    initialData: { data: [] },
    queryFn: () => {
      return listingPropertiesApi({
        data: {
          status: "'active','inactive','draft'",
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["listing-properties", "'active','inactive','draft'"],
  });

  ////////

  const { data: locationsApiData, isFirstLoading: locationsApiIsFirstLoading } =
    useQuery<locationsAPIResponseType, Error, locationsAPIResponseType>({
      initialData: { data: [] },
      queryFn: () => {
        return locationsApi({ data: { userId: getUserDetails().id } });
      },
      queryKey: ["locations"],
    });

  ////////

  const [searchText, setSearchText] = useState<string>("");
  const [filteredListingsData, setFilteredListingsData] = useState<
    ListingPropertiesType[]
  >([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const {
    value: isSearching,
    setTrue: setIsSearchingTrue,
    setFalse: setIsSearchingFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: manageListingDialogIsOpen,
    setTrue: setManageListingDialogIsOpenTrue,
    setFalse: setManageListingDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const isLoading =
    listingPropertiesApiIsFirstLoading || locationsApiIsFirstLoading;

  const { toggle: toggleIsListingsListView, value: isListingsListView } =
    useToggle({
      initialValue: (getSelectedListingsView() || "List") === "List",
    });

  useEffect(() => {
    setSelectedListingsView({
      selectedListingsView: isListingsListView ? "List" : "Grid",
    });
  }, [isListingsListView]);

  const handleCloseClick = useCallback(() => {
    setIsSearchingFalse();
    setSearchText("");
  }, [setIsSearchingFalse]);

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  ////////

  const [selectedListing, setSelectedListing] =
    useState<ListingPropertiesType | null>(null);

  const handleOpenManageListingDialog = (
    listingData: ListingPropertiesType,
  ) => {
    setSelectedListing(listingData);
    setManageListingDialogIsOpenTrue();
  };

  ////////

  useEffect(() => {
    const filtered =
      listingPropertiesApiData?.data?.filter((listing) => {
        const locationLabel =
          locationsApiData?.data.find(
            (location) => location.id === listing.location,
          )?.label || "";

        const searchTerm = searchText.trim().toLowerCase();

        return (
          (listing.title || "").toLowerCase().includes(searchTerm) ||
          locationLabel.toLowerCase().includes(searchTerm)
        );
      }) || [];

    setFilteredListingsData(filtered);
  }, [searchText, listingPropertiesApiData, locationsApiData]);

  return {
    filteredListingsData,
    handleCloseClick,
    handleOpenManageListingDialog,
    isListingsListView,
    isLoading,
    isSearching,
    locationsApiData,
    manageListingDialogIsOpen,
    searchInputRef,
    searchText,
    selectedListing,
    setIsSearchingTrue,
    setManageListingDialogIsOpenFalse,
    setManageListingDialogIsOpenTrue,
    setSearchText,
    toggleIsListingsListView,
  };
}

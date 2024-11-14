import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

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
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useListings() {
  const {
    data: listingPropertiesApiData,
    isFirstLoading: listingPropertiesApiIsFirstLoading,
    SnackbarAlert: ListingPropertiesApiSnackbarAlert,
  } = useQuery<
    listingPropertiesApiResponseType,
    Error,
    listingPropertiesApiResponseType
  >({
    initialData: { data: [] },
    queryFn: () => {
      return listingPropertiesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["listing-properties"],
  });

  ////////

  const {
    data: locationsApiData,
    isFirstLoading: locationsApiIsFirstLoading,
    SnackbarAlert: LocationsApiSnackbarAlert,
  } = useQuery<locationsAPIResponseType, Error, locationsAPIResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return locationsApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["locations"],
  });

  ////////

  const [searchText, setSearchText] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

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

  const { value: isListingsListView, toggle: setIsListingsListViewTrue } =
    useToggle({
      initialValue: true,
    });

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

  return {
    handleCloseClick,
    handleOpenManageListingDialog,
    isListingsListView,
    isLoading,
    isSearching,
    listingPropertiesApiData,
    ListingPropertiesApiSnackbarAlert,
    locationsApiData,
    LocationsApiSnackbarAlert,
    manageListingDialogIsOpen,
    router,
    searchInputRef,
    searchText,
    selectedListing,
    setIsListingsListViewTrue,
    setIsSearchingTrue,
    setManageListingDialogIsOpenFalse,
    setManageListingDialogIsOpenTrue,
    setSearchText,
  };
}

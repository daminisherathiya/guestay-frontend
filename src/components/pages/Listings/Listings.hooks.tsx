import { useCallback, useEffect, useRef, useState } from "react";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useToggle } from "@/hooks/useToggle/useToggle";

export function useListings() {
  const [searchText, setSearchText] = useState<string>("");
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

  return {
    handleCloseClick,
    isListingsListView,
    isSearching,
    manageListingDialogIsOpen,
    searchInputRef,
    searchText,
    setIsListingsListViewTrue,
    setIsSearchingTrue,
    setManageListingDialogIsOpenFalse,
    setManageListingDialogIsOpenTrue,
    setSearchText,
  };
}

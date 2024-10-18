import { useEffect, useRef, useState } from "react";

export function useListings() {
  const [isManageListingDialogOpen, setManageListingDialogOpen] =
    useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenManageListingDialog = () => {
    setManageListingDialogOpen(true);
  };

  const handleCloseManageListingDialog = () => {
    setManageListingDialogOpen(false);
  };

  const [isListingsListView, setIsListingsListView] = useState(true);

  const toggleListingsView = () => {
    setIsListingsListView(!isListingsListView);
  };

  const handleSearchIconClick = () => {
    setIsSearching(true);
  };

  const handleCloseClick = () => {
    setIsSearching(false);
    setSearchText("");
  };

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  // const router = useRouter();

  // // Function to handle redirection
  // const handleRedirect = () => {
  //   router.push("/become-a-host");
  // };

  return {
    handleCloseClick,
    handleCloseManageListingDialog,
    handleOpenManageListingDialog,
    handleSearchIconClick,
    isListingsListView,
    isManageListingDialogOpen,
    isSearching,
    searchInputRef,
    searchText,
    setSearchText,
    toggleListingsView,
  };
}

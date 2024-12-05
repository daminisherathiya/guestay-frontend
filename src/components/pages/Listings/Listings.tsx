"use client";

import CloseIcon from "@mui/icons-material/Close";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { InputAdornment } from "@/components/atoms/InputAdornment";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";

import PlusIcon from "/public/images/plus.svg";

import Link from "next/link";

import { ListingsGridView } from "./components/ListingsGridView";
import { ListingsListView } from "./components/ListingsListView";
import { ManageListingDialog } from "./components/ManageListingDialog";
import { useListings } from "./Listings.hooks";

export function Listings() {
  const {
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
    setSearchText,
    toggleIsListingsListView,
  } = useListings();

  return (
    <>
      <Container className="mb-10 sm:mb-16" maxWidth="2xl">
        <Stack className="relative mb-6 flex-wrap gap-6 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-12 md:mb-11 md:mt-10 md:gap-24">
          <Typography component="h1" variant="h1">
            Your listings
          </Typography>
          <Stack className="grow flex-row items-center gap-4">
            <Box
              className={`grow sm:text-end ${isSearching ? "absolute left-0 z-[1] w-full md:static md:w-auto" : ""}`}
            >
              {!isSearching ? (
                <IconButton
                  className="size-11 bg-action-hover hover:bg-divider"
                  onClick={setIsSearchingTrue}
                >
                  <SearchIcon className="size-5 text-text-primary" />
                </IconButton>
              ) : (
                <TextField
                  autoComplete="off"
                  className="w-full"
                  id="filled-search"
                  inputRef={searchInputRef}
                  placeholder="Search here…"
                  slotProps={{
                    input: {
                      classes: {
                        input: "py-3",
                      },
                      className: "bg-action-hover rounded-pill text-sm",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            className="size-5 bg-divider"
                            onClick={handleCloseClick}
                          >
                            <CloseIcon className="size-3" />
                          </IconButton>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="size-5" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
            </Box>
            <Box>
              <IconButton
                className="size-11 bg-action-hover hover:bg-divider"
                onClick={toggleIsListingsListView}
              >
                {isListingsListView ? (
                  <GridViewIcon className="size-5 text-text-primary" />
                ) : (
                  <ViewAgendaOutlinedIcon className="size-5 text-text-primary" />
                )}
              </IconButton>
            </Box>
            <Link href="/become-a-host">
              <IconButton className="size-11 bg-action-hover hover:bg-divider">
                <PlusIcon className="size-5 text-text-primary" />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        {isListingsListView ? (
          <ListingsListView
            handleOpenManageListingDialog={handleOpenManageListingDialog}
            isLoading={isLoading}
            listingPropertiesApiData={{ data: filteredListingsData }}
            locationsApiData={locationsApiData}
          />
        ) : (
          <ListingsGridView
            handleOpenManageListingDialog={handleOpenManageListingDialog}
            isLoading={isLoading}
            listingPropertiesApiData={{ data: filteredListingsData }}
            locationsApiData={locationsApiData}
          />
        )}
        <ManageListingDialog
          handleCloseManageListingDialog={setManageListingDialogIsOpenFalse}
          manageListingDialogIsOpen={manageListingDialogIsOpen}
          selectedListing={selectedListing}
        />
      </Container>
    </>
  );
}

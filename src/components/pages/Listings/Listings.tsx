"use client";
import { useEffect, useRef, useState } from "react";

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

import ListingsGridView from "@/components/molecules/ListingsGridView/ListingsGridView";
import ListingsListView from "@/components/molecules/ListingsListView/ListingsListView";
import ManageListingDialog from "@/components/molecules/ManageListingDialog/ManageListingDialog";

export default function Listings() {
  const [isManageListingDialogOpen, setManageListingDialogOpen] =
    useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  // const router = useRouter();

  // // Function to handle redirection
  // const handleRedirect = () => {
  //   router.push("/become-a-host");
  // };

  return (
    <Container maxWidth="2xl">
      <Stack className="mb-6 mt-10 flex-row flex-wrap items-center justify-between gap-24 md:mb-11">
        <Typography component="h1" variant="h1">
          Your listings
        </Typography>
        <Stack className="grow flex-row items-center gap-4">
          <Box className="grow text-end">
            {!isSearching ? (
              <IconButton
                className="size-11 bg-action-hover hover:bg-divider"
                onClick={handleSearchIconClick}
              >
                <SearchIcon className="size-5 text-text-primary" />
              </IconButton>
            ) : (
              <TextField
                className="w-full"
                id="filled-search"
                inputRef={inputRef}
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
              onClick={toggleListingsView}
            >
              {isListingsListView ? (
                <GridViewIcon className="size-5 text-text-primary" />
              ) : (
                <ViewAgendaOutlinedIcon className="size-5 text-text-primary" />
              )}
            </IconButton>
          </Box>
          <Box>
            <IconButton
              className="size-11 bg-action-hover hover:bg-divider"
              // onClick={handleRedirect}
            >
              <PlusIcon className="size-5 text-text-primary" />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
      {isListingsListView ? (
        <ListingsListView
          handleOpenManageListingDialog={handleOpenManageListingDialog}
        />
      ) : (
        <ListingsGridView
          handleOpenManageListingDialog={handleOpenManageListingDialog}
        />
      )}
      <ManageListingDialog
        handleCloseManageListingDialog={handleCloseManageListingDialog}
        isManageListingDialogOpen={isManageListingDialogOpen}
      />
    </Container>
  );
}
import Image from "next/image";

import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { ListingPropertiesType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { Box } from "@/components/atoms/Box";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import {
  getDefaultPropertyTitle,
  getListingStatusToDisplay,
  getPropertyImageUrl,
} from "@/utils/common";

import { ListingsListViewProps } from "./ListingsListView.types";

export function ListingsListView({
  handleOpenManageListingDialog,
  isLoading,
  listingPropertiesApiData,
  locationsApiData,
}: ListingsListViewProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef<ListingPropertiesType>[] = [
    {
      field: "title",
      flex: 0.46,
      headerName: "Listing",
      minWidth: 400,
      renderCell: (row) => {
        const coverImage = row.row.images.split(",")[0] || "";
        return (
          <Stack className="h-full flex-row items-center gap-6">
            <Box className="aspect-square size-16 shrink-0 overflow-hidden rounded bg-divider">
              {coverImage ? (
                <Image
                  alt="Cover picture"
                  className="size-full max-h-full max-w-full object-cover"
                  height={64}
                  src={getPropertyImageUrl({
                    imageName: coverImage,
                    width: 1000,
                  })}
                  width={64}
                />
              ) : (
                <HomeIcon className="block size-full max-h-full max-w-full text-text-secondary/20" />
              )}
            </Box>
            <Typography
              className="text-wrap font-medium text-text-primary"
              variant="body2"
            >
              {row.row.title ||
                getDefaultPropertyTitle({
                  createdAt: row.row.created_at,
                })}
            </Typography>
          </Stack>
        );
      },
      sortable: true,
      sortComparator: (value1, value2, cellParams1, cellParams2) => {
        const listing1 = cellParams1.api.getRow(cellParams1.id);
        const listing2 = cellParams2.api.getRow(cellParams2.id);

        const computedValue1 =
          value1 || getDefaultPropertyTitle({ createdAt: listing1.created_at });
        const computedValue2 =
          value2 || getDefaultPropertyTitle({ createdAt: listing2.created_at });

        return computedValue1.localeCompare(computedValue2);
      },
    },
    {
      field: "location",
      flex: 0.26,
      headerName: "Location",
      minWidth: 200,
      renderCell: (row) => {
        return (
          <Stack className="h-full justify-center">
            <Typography className="text-wrap" variant="body2">
              {locationsApiData?.data.find(
                (location) => location.id === row.row.location,
              )?.label || ""}
            </Typography>
          </Stack>
        );
      },
      sortable: true,
      valueGetter: (params) => {
        return (
          locationsApiData?.data.find((location) => location.id === params)
            ?.label || ""
        );
      },
    },
    {
      field: "status",
      flex: 0.2,
      headerName: "Status",
      minWidth: 200,
      renderCell: (row) => {
        const statusToDisplay = getListingStatusToDisplay({
          listingSteps: row.row.listing_steps || "",
          status: row.row.status,
        });

        return (
          <Stack className="h-full flex-row items-center gap-2">
            <Box
              className={`size-3 shrink-0 rounded-full ${
                statusToDisplay === "active"
                  ? "bg-success-main"
                  : statusToDisplay === "inactive"
                    ? "bg-error-dark"
                    : "bg-warning-light"
              }`}
            ></Box>
            <Typography
              className="text-wrap first-letter:uppercase"
              variant="body2"
            >
              {statusToDisplay}
            </Typography>
          </Stack>
        );
      },
      sortable: true,
      sortComparator: (_1, _2, cellParams1, cellParams2) => {
        const listing1 = cellParams1.api.getRow(cellParams1.id);
        const listing2 = cellParams2.api.getRow(cellParams2.id);

        const computedValue1 = getListingStatusToDisplay({
          listingSteps: listing1.listing_steps || "",
          status: listing1.status,
        });
        const computedValue2 = getListingStatusToDisplay({
          listingSteps: listing2.listing_steps || "",
          status: listing2.status,
        });

        return computedValue1.localeCompare(computedValue2);
      },
    },
    {
      field: "action",
      flex: 0.06,
      headerName: "",
      minWidth: 70,
      renderCell: () => {
        return (
          <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
        );
      },
      sortable: false,
    },
  ];

  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      hideFooter
      classes={{
        cell: "text-text-secondary px-3 border-none outline-none cursor-pointer",
        columnHeader:
          "outline-none border-b border-solid border-divider mb-3 px-3",
        columnSeparator: "hidden",
        footerContainer: "border-none",
        row: "rounded-xl",
      }}
      className="border-none"
      columnHeaderHeight={isSmallScreen ? 48 : 64}
      columns={columns}
      loading={isLoading}
      pageSizeOptions={[5, 10]}
      rowHeight={88}
      rows={isLoading ? [] : listingPropertiesApiData?.data}
      slots={{
        loadingOverlay: () => (
          <Box className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Box key={index} className="flex items-center">
                <Skeleton
                  animation="wave"
                  className="h-20 rounded-xl"
                  variant="rectangular"
                  width="100%"
                />
              </Box>
            ))}
          </Box>
        ),
        noRowsOverlay: () => (
          <Typography className="flex h-full items-center justify-center p-3">
            No listings available.
          </Typography>
        ),
      }}
      sx={{
        "& .c-keyboard-arrow-icon": {
          visibility: "hidden",
        },
        "& .MuiDataGrid-row:hover .c-keyboard-arrow-icon": {
          visibility: "visible",
        },
      }}
      onRowClick={(params) => handleOpenManageListingDialog(params.row)}
    />
  );
}

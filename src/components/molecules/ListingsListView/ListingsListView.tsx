import Image from "next/image";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

interface ListingsListViewProps {
  handleOpenManageListingDialog: () => void;
}

const columns = [
  {
    field: "listing",
    flex: 0.46,
    headerName: "Listing",
    renderCell: () => {
      return (
        <Stack className="h-full flex-row items-center gap-6">
          <Box className="aspect-square size-16 shrink-0 overflow-hidden rounded bg-divider">
            <Image
              alt="Cover picture"
              className="max-h-full max-w-full object-cover"
              height={64}
              src="/images/aa.jpg"
              width={64}
            />
          </Box>
          <Typography
            className="text-wrap font-medium text-text-primary"
            variant="body2"
          >
            The Orchard House
          </Typography>
        </Stack>
      );
    },
    sortable: false,
  },
  {
    field: "location",
    flex: 0.26,
    headerName: "Location",
  },
  {
    field: "status",
    flex: 0.2,
    headerName: "Status",
    renderCell: () => {
      return (
        <Stack className="h-full flex-row items-center gap-2">
          <Box className="size-3 shrink-0 rounded-full bg-[#C13515]"></Box>
          <Typography className="text-wrap" variant="body2">
            Verification required
          </Typography>
        </Stack>
      );
    },
    sortable: false,
  },
  {
    flex: 0.06,
    headerName: "",
    renderCell: () => {
      return (
        <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
      );
    },
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    listing: 1,
    location: "Charlotte, NC",
    status: "Verification required",
  },
  {
    id: 2,
    listing: 1,
    location: "Charlotte, NC",
    status: "Verification required",
  },
  {
    id: 3,
    listing: 1,
    location: "Charlotte, NC",
    status: "Verification required",
  },
  { id: 4, listing: 1, location: "Charlotte, NC", status: "In progress" },
  { id: 5, listing: 1, location: "Charlotte, NC", status: "In progress" },
  { id: 6, listing: 1, location: "Charlotte, NC", status: "In progress" },
];
const paginationModel = { page: 0, pageSize: 5 };

export default function ListingsListView({
  handleOpenManageListingDialog,
}: ListingsListViewProps) {
  return (
    <DataGrid
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      classes={{
        cell: "text-text-secondary px-3 border-none outline-none cursor-pointer",
        columnHeader: "outline-none border-none px-3",
        columnSeparator: "hidden",
        footerContainer: "border-none",
        row: "rounded-xl",
      }}
      className="border-none"
      columnHeaderHeight={64}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      rowHeight={88}
      rows={rows}
      sx={{
        "& .c-keyboard-arrow-icon": {
          visibility: "hidden",
        },
        "& .MuiDataGrid-row:hover .c-keyboard-arrow-icon": {
          visibility: "visible",
        },
      }}
      onRowClick={handleOpenManageListingDialog}
    />
  );
}

"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import ChecklistIcon from "@mui/icons-material/Checklist";
import CloseIcon from "@mui/icons-material/Close";
import DateRangeIcon from "@mui/icons-material/DateRange";
import NotesIcon from "@mui/icons-material/Notes";
import { Button } from "@mui/material";
import dayjs from "dayjs";

import { Box } from "@/components/atoms/Box";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useBlockedDates } from "./BlockedDates.hooks";

export function BlockedDates() {
  const { propertyId }: { propertyId: string } = useParams();
  const {
    deleteBlockOutDatesApiIsPending,
    getBlockOutDatesApiIsLoading,
    onDeleteBlockOutDates,
    selectedBlockedDatesDetails,
  } = useBlockedDates();

  return (
    <>
      <Stack className="sticky -top-8 z-10 -mx-6 mb-5 items-end bg-common-white pr-6">
        <Link href={`/multicalendar/${propertyId}/pricing-settings`}>
          <IconButton aria-label="close" className="-mr-2 size-8">
            <CloseIcon className="size-5" />
          </IconButton>
        </Link>
      </Stack>
      <Box className="space-y-5">
        <Typography className="font-bold opacity-85" variant="h2">
          Blocked details
        </Typography>
        <Stack className="gap-1.5">
          <Stack className="flex-row items-center gap-2">
            <ChecklistIcon className="size-5" />
            <Typography
              className="font-medium text-text-primary"
              variant="body1"
            >
              Type
            </Typography>
          </Stack>
          {getBlockOutDatesApiIsLoading ? (
            <Skeleton className="w-1/2" variant="text" />
          ) : (
            <Typography className="pl-7 text-text-secondary" variant="body2">
              {selectedBlockedDatesDetails?.type}
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack className="gap-1.5">
          <Stack className="flex-row items-center gap-2">
            <DateRangeIcon className="size-5" />
            <Typography
              className="font-medium text-text-primary"
              variant="body1"
            >
              Dates
            </Typography>
          </Stack>
          {getBlockOutDatesApiIsLoading ? (
            <Skeleton className="w-3/4" variant="text" />
          ) : (
            <Typography className="pl-7 text-text-secondary" variant="body2">
              {dayjs(selectedBlockedDatesDetails?.start_date).format(
                "DD MMM YYYY",
              )}{" "}
              -{" "}
              {dayjs(selectedBlockedDatesDetails?.end_date).format(
                "DD MMM YYYY",
              )}
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack className="gap-1.5">
          <Stack className="flex-row items-center gap-2">
            <NotesIcon className="size-5" />
            <Typography
              className="font-medium text-text-primary"
              variant="body1"
            >
              Note
            </Typography>
          </Stack>
          {getBlockOutDatesApiIsLoading ? (
            <div>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton className="w-4/5" variant="text" />
              <Skeleton className="w-3/5" variant="text" />
            </div>
          ) : (
            <Typography
              className="break-words pl-7 text-text-secondary"
              variant="body2"
            >
              {selectedBlockedDatesDetails?.note}
            </Typography>
          )}
        </Stack>
        <Stack className="gap-3">
          <LoadingButton
            className="w-full"
            disabled={deleteBlockOutDatesApiIsPending}
            loading={deleteBlockOutDatesApiIsPending}
            loadingIndicator="Unblocking dates ..."
            size="large"
            type="submit"
            variant="contained"
            onClick={onDeleteBlockOutDates}
          >
            Unblock
          </LoadingButton>
          <Button
            className="w-full border-primary-main"
            component={Link}
            href={`/multicalendar/${propertyId}/pricing-settings`}
            size="large"
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </>
  );
}

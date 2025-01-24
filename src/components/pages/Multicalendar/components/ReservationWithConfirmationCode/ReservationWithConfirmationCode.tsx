"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import { Button } from "@mui/material";

import { Avatar } from "@/components/atoms/Avatar";
import { Box } from "@/components/atoms/Box";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { TextareaAutosize } from "@/components/atoms/TextareaAutosize";
import { Typography } from "@/components/atoms/Typography";

import { useReservationWithConfirmationCode } from "./ReservationWithConfirmationCode.hooks";

export function ReservationWithConfirmationCode() {
  const {
    allBookingsApiIsFirstLoading,
    formattedBookingDateRange,
    guestBookingStatus,
    guestNameInitialLater,
    selectedBookingDetails,
    isBreakdownShow,
    toggleIsBreakdownShow,
  } = useReservationWithConfirmationCode();

  const { propertyId }: { propertyId: string } = useParams();

  return (
    <>
      <Stack className="sticky -top-8 z-10 -mx-6 mb-5 items-end bg-common-white pr-6">
        <Link href={`/multicalendar/${propertyId}/pricing-settings`}>
          <IconButton aria-label="close" className="-mr-2 size-8">
            <CloseIcon className="size-5" />
          </IconButton>
        </Link>
      </Stack>
      <Stack className="flex-row items-center justify-between gap-6">
        <Stack className="grow gap-0.5">
          {allBookingsApiIsFirstLoading ? (
            <Skeleton className="h-8 w-full rounded" variant="rectangular" />
          ) : (
            <>
              <Typography
                className="font-medium text-text-secondary"
                variant="body2"
              >
                {guestBookingStatus}
              </Typography>
              <Typography className="text-2xl font-bold" variant="h2">
                {selectedBookingDetails?.guest_name}
              </Typography>
            </>
          )}
        </Stack>
        <Avatar className="size-12 bg-primary-main text-base font-medium">
          {guestNameInitialLater}
        </Avatar>
      </Stack>
      <Box className="mt-4">
        {allBookingsApiIsFirstLoading ? (
          <>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton className="w-4/5" variant="text" />
            <Skeleton className="w-3/5" variant="text" />
          </>
        ) : (
          <>
            <Typography className="hidden">
              1362 E 10th St · Oasis in the Desert King/Great Location/Pool/Wifi
            </Typography>
            <Typography>{formattedBookingDateRange}</Typography>
            <Typography className="hidden">2 guests · $698.4</Typography>
          </>
        )}
      </Box>
      <Divider className="-mx-6 my-8 hidden border-4 border-action-selected" />
      <Box className="hidden">
        <Typography className="font-bold opacity-85" variant="h2">
          Booking details
        </Typography>
        <Box className="*:border-divider *:py-6 last:*:pb-0 [&:not(:last-child)]:*:border-b">
          <Stack className="flex-row items-baseline justify-between">
            <Stack className="gap-0.5">
              <Typography className="opacity-85">Guests</Typography>
              <Typography className="text-text-secondary" variant="body2">
                2 adults
              </Typography>
            </Stack>
            <Box>
              <Button
                disableRipple
                className="min-w-0 p-0 hover:bg-common-transparent"
              >
                View
              </Button>
            </Box>
          </Stack>
          <Stack className="gap-0.5">
            <Typography className="opacity-85">Check-in time</Typography>
            <Typography className="text-text-secondary" variant="body2">
              4:00 pm - 6:00 pm
            </Typography>
          </Stack>
          <Stack className="gap-0.5">
            <Typography className="opacity-85">Confirmation code</Typography>
            <Typography className="text-text-secondary" variant="body2">
              HMEBQT2ME4
            </Typography>
          </Stack>
          <Stack className="gap-0.5">
            <Typography className="opacity-85">Cancellation policy</Typography>
            <Typography className="text-text-secondary" variant="body2">
              Firm
            </Typography>
          </Stack>
          <Button
            disableRipple
            className="p-0 hover:bg-common-transparent"
            size="large"
          >
            Show calendar
          </Button>
        </Box>
      </Box>
      <Divider className="-mx-6 my-8 hidden border-4 border-action-selected" />
      <Box className="hidden">
        <Typography className="mb-6 font-bold opacity-85" variant="h2">
          Guest paid
        </Typography>
        <Stack className="gap-2 opacity-85">
          <Stack className="flex-row justify-between gap-2">
            <Typography>$140 x 3 nights</Typography>
            <Typography>$420</Typography>
          </Stack>
          <Stack className="flex-row justify-between gap-2">
            <Typography>Cleaning fee</Typography>
            <Typography>$300</Typography>
          </Stack>
          <Stack className="flex-row justify-between gap-2">
            <Typography>Guest service fee</Typography>
            <Typography>$101.65</Typography>
          </Stack>
          <Stack className="flex-row justify-between gap-2">
            <Typography>Occupancy taxes</Typography>
            <Typography>$93.23</Typography>
          </Stack>
          <Stack className="mt-2 flex-row justify-between gap-2">
            <Typography className="font-bold">Total (USD)</Typography>
            <Typography className="font-bold">$914.88</Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider className="-mx-6 my-8 hidden border-4 border-action-selected" />
      <Box className="hidden">
        <Typography className="mb-6 font-bold opacity-85" variant="h2">
          Host payout
        </Typography>
        <Stack className="gap-2 opacity-85">
          <Box>
            <Stack className="flex-row justify-between gap-2">
              <Typography>3-night room fee</Typography>
              <Typography>$420</Typography>
            </Stack>

            <Stack
              className={`gap-1  ${isBreakdownShow ? "" : "h-0 overflow-hidden"}`}
            >
              <Stack className="flex-row justify-between gap-2">
                <Typography variant="body2">Thu, 11/28</Typography>
                <Typography variant="body2">$140</Typography>
              </Stack>
              <Stack className="flex-row justify-between gap-2">
                <Typography variant="body2">Fri, 11/29</Typography>
                <Typography variant="body2">$140</Typography>
              </Stack>
              <Stack className="flex-row justify-between gap-2">
                <Typography variant="body2">Sat, 11/30</Typography>
                <Typography variant="body2">$140</Typography>
              </Stack>
            </Stack>
            <Button
              disableRipple
              className="justify-start p-0 leading-4 hover:bg-common-transparent"
              onClick={toggleIsBreakdownShow}
            >
              {isBreakdownShow ? "Collapse details" : "Show breakdowns"}
            </Button>
          </Box>
          <Stack className="flex-row justify-between gap-2">
            <Typography>Cleaning fee</Typography>
            <Typography>$300</Typography>
          </Stack>
          <Stack className="flex-row justify-between gap-2">
            <Typography>Host service fee (3.0%)</Typography>
            <Typography>−$21.6</Typography>
          </Stack>
          <Stack className="mt-2 flex-row justify-between gap-2">
            <Typography className="font-bold">Total (USD)</Typography>
            <Typography className="font-bold">$698.4</Typography>
          </Stack>
        </Stack>
        <Divider className="my-6" />
        <Link href="./availability-settings/additional-controls">
          <Stack className="flex-row items-center justify-between">
            <Stack className="flex-row items-center gap-4">
              <PaymentIcon />
              <Typography className="font-medium">
                Transaction History
              </Typography>
            </Stack>
            <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
          </Stack>
        </Link>
      </Box>
      <Divider className="-mx-6 my-8 hidden border-4 border-action-selected" />
      <Box className="hidden">
        <Typography className="mb-6 font-bold opacity-85" variant="h2">
          Calendar note
        </Typography>
        <Stack className="flex-row items-center gap-2">
          <LockIcon className="size-4 text-text-secondary" />
          <Typography className="text-text-secondary" variant="body2">
            Add a private reminder for these dates that only you can view
          </Typography>
        </Stack>
        <TextareaAutosize
          className="mt-6 w-full rounded-lg border p-3 focus:outline-2 focus:outline-common-black"
          id="reservation-note"
          maxRows={4}
          minRows={4}
          placeholder="Write a note"
        />
        <Button
          className="mt-4 w-full border-primary-main"
          size="large"
          variant="outlined"
        >
          Save
        </Button>
      </Box>
      <Divider className="-mx-6 my-8 hidden border-4 border-action-selected" />
      <Box className="hidden">
        <Typography className="mb-6 font-bold opacity-85" variant="h2">
          Common questions
        </Typography>
        <Box className="*:border-divider *:py-6 first:*:pt-0 last:*:pb-0 [&:not(:last-child)]:*:border-b">
          <Stack className="gap-2">
            <Typography className="font-medium opacity-85">
              Editing a review you wrote
            </Typography>
            <Stack className="gap-4 opacity-85">
              <Typography>
                You can edit a review you’ve drafted until your review is
                published.
              </Typography>
              <Button
                disableRipple
                className="min-w-0 justify-start p-0 leading-4 hover:bg-common-transparent"
                size="large"
              >
                Read more
              </Button>
            </Stack>
          </Stack>
          <Stack className="gap-2">
            <Typography className="font-medium opacity-85">
              How do I print receipts and payout details for completed
              reservations?
            </Typography>
            <Stack className="gap-4 opacity-85">
              <Typography>
                You can find individual receipts when you go to your
                reservations.
              </Typography>
              <Button
                disableRipple
                className="min-w-0 justify-start p-0 leading-4 hover:bg-common-transparent"
                size="large"
              >
                Read more
              </Button>
            </Stack>
          </Stack>
          <Stack className="gap-2">
            <Typography className="font-medium opacity-85">
              Refund your guest
            </Typography>
            <Stack className="gap-4 opacity-85">
              <Typography>
                How you refund a guest depends on whether it’s before or after
                their trip.
              </Typography>
              <Button
                disableRipple
                className="min-w-0 justify-start p-0 leading-4 hover:bg-common-transparent"
                size="large"
              >
                Read more
              </Button>
            </Stack>
          </Stack>
          <Button
            disableRipple
            className="mb-8 min-w-0 justify-start p-0 leading-4 hover:bg-common-transparent"
            size="large"
          >
            Show more topics
          </Button>
        </Box>
      </Box>
    </>
  );
}

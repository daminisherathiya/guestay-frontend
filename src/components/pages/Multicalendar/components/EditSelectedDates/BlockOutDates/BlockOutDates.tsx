"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { RadioFieldWrapper } from "@/components/molecules/RadioFieldWrapper";
import { TextareaAutosizeFieldWrapper } from "@/components/molecules/TextareaAutosizeFieldWrapper";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";

import { useBlockOutDates } from "./BlockOutDates.hooks";

export function BlockOutDates() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    saveBlockOutDatesApiIsPending,
  } = useBlockOutDates();

  const { formatSelectedDates } = useMulticalendarContext();

  return (
    <>
      <Link passHref href={`/multicalendar/${propertyId}/edit-selected-dates`}>
        <IconButton aria-label="Back" className="-ml-2 size-8" component="a">
          <ArrowBackIosOutlinedIcon className="size-4" />
        </IconButton>
      </Link>
      <Stack className="gap-8">
        <Box className="space-y-2">
          <Typography className="mb-2 mt-6 font-medium" variant="h3">
            Block out dates
          </Typography>
          <Typography className="text-text-secondary" variant="body2">
            {formatSelectedDates()} selected
          </Typography>
        </Box>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <RadioFieldWrapper
            className="gap-y-2"
            control={control}
            label="Block out dates for:"
            name="type"
            options={[
              { label: "Check-in", value: "checkin" },
              { label: "Check-out", value: "checkout" },
            ]}
          />
          <TextareaAutosizeFieldWrapper
            control={control}
            name="note"
            placeholder="Add a private note"
            rules={{
              required: "Please add a note",
            }}
          />
          <Stack className="gap-3">
            <LoadingButton
              className="w-full"
              disabled={!isValid}
              loading={saveBlockOutDatesApiIsPending}
              loadingIndicator="Blocking dates ..."
              size="large"
              type="submit"
              variant="contained"
            >
              Block dates
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
        </form>
      </Stack>
    </>
  );
}

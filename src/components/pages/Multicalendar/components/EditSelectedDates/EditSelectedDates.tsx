"use client";
import Link from "next/link";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Tab } from "@/components/atoms/Tab";
import { Tabs } from "@/components/atoms/Tabs";
import { Typography } from "@/components/atoms/Typography";
import { useTabIndex } from "@/hooks/useTabIndex";

import { useEditSelectedDates } from "./EditSelectedDates.hooks";
import { PriceBreakdownDialog } from "./PriceBreakdownDialog";

export function EditSelectedDates() {
  const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
    initialIndex: 0,
  });

  const {
    priceBreakdownDialogIsOpen,
    setPriceBreakdownDialogIsOpenFalse,
    setPriceBreakdownDialogIsOpenTrue,
  } = useEditSelectedDates();

  return (
    <>
      <Stack className="gap-5">
        <Stack className="mb-3 flex-row items-center justify-between">
          <Typography variant="h2">18–20 Dec</Typography>
          <IconButton aria-label="close" className="-mr-2 size-8">
            <CloseIcon className="size-5" />
          </IconButton>
        </Stack>
        <Tabs
          aria-label="Listing editor"
          classes={{
            flexContainer:
              "bg-action-hover rounded-pill p-1 border border-divider",
            indicator: "hidden",
          }}
          className="grow"
          value={selectedEditorTabIndex}
          onChange={handleEditorTabChange}
        >
          <Tab
            aria-controls="open"
            classes={{
              selected:
                "bg-common-white bg-primary-main !text-common-white !no-underline",
            }}
            className="min-h-0 w-1/2 grow rounded-pill px-3 py-2 text-primary-main hover:underline"
            id="open"
            label={
              <Typography
                className="font-medium lowercase leading-5 first-letter:uppercase"
                variant="body2"
              >
                Open
              </Typography>
            }
          />
          <Tab
            aria-controls="open"
            classes={{
              selected:
                "bg-common-white bg-primary-main !text-common-white !no-underline",
            }}
            className="min-h-0 w-1/2 grow rounded-pill px-3 py-2 text-primary-main hover:underline"
            id="block-night"
            label={
              <Typography
                className="font-medium lowercase leading-5 first-letter:uppercase"
                variant="body2"
              >
                Block night
              </Typography>
            }
          />
        </Tabs>
        <Link href="./edit-selected-dates/nightly-price">
          <Box className="space-y-2 rounded-2xl border border-divider p-6">
            <Typography className="text-3xl font-bold">$25</Typography>
          </Box>
        </Link>
        <Button
          disableRipple
          className="justify-start rounded-2xl border border-divider p-6 hover:bg-common-transparent"
          variant="outlined"
          onClick={setPriceBreakdownDialogIsOpenTrue}
        >
          <Stack className="flex-row items-center justify-between">
            <Box>
              <Typography variant="body2">Guest total ₹1,162</Typography>
            </Box>
          </Stack>
        </Button>
        <PriceBreakdownDialog
          priceBreakdownDialogIsOpen={priceBreakdownDialogIsOpen}
          setPriceBreakdownDialogIsOpenFalse={
            setPriceBreakdownDialogIsOpenFalse
          }
        />
        <Link href="./availability-settings/custom-length/add">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Custom trip lengths</Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
        <Link href="./edit-selected-dates/notes">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Add a private note</Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
    </>
  );
}

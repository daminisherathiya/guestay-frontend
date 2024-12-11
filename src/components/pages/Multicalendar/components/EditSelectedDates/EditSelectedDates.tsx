"use client";

import { Stack } from "@/components/atoms/Stack";
import { Tab } from "@/components/atoms/Tab";
import { Tabs } from "@/components/atoms/Tabs";
import { Typography } from "@/components/atoms/Typography";
import { useTabIndex } from "@/hooks/useTabIndex";

export function EditSelectedDates() {
  const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
    initialIndex: 0,
  });

  return (
  <Tabs
    aria-label="Listing editor"
    classes={{
      flexContainer: "bg-action-hover rounded-pill p-1 border border-divider",
      indicator: "hidden",
    }}
    className="grow"
    value={selectedEditorTabIndex}
    onChange={handleEditorTabChange}
  >
      <Tab
        aria-controls="open"
        classes={{ selected: "bg-common-white bg-primary-main !text-common-white !no-underline" }}
        className="min-h-0 grow w-1/2 rounded-pill px-3 py-2 text-primary-main hover:underline"
        id="open"
        label={<Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Open
        </Typography>}
      />
      <Tab
        aria-controls="open"
        classes={{ selected: "bg-common-white bg-primary-main !text-common-white !no-underline" }}
        className="min-h-0 grow w-1/2 rounded-pill px-3 py-2 text-primary-main hover:underline"
        id="block-night"
        label={<Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Block night
        </Typography>}
      />
  </Tabs>)
}
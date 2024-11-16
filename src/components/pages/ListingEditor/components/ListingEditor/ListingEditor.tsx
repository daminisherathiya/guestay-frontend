"use client";

import { ReactNode } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TuneIcon from "@mui/icons-material/Tune";
import { Tab, Tabs } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { useTabIndex } from "@/hooks/useTabIndex/useTabIndex";

import { VerticalTabs } from "../VerticalTabs";

import { useListingEditor } from "./ListingEditor.hooks";
import { TabPanelProps } from "./ListingEditor.types";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`listing-editor-tab-${index}`}
      hidden={value !== index}
      id={`listing-editor-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export function ListingEditor({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { arrivalGuideTabsInfo, yourSpaceTabsInfo } = useListingEditor();

  const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
    initialIndex: 0,
  });
  const [selectedYourSpaceTabIndex, handleYourSpaceTabChange] = useTabIndex({
    initialIndex: 0,
  });
  const [selectedArrivalGuideTabIndex, handleArrivalGuideTabChange] =
    useTabIndex({ initialIndex: 0 });

  const editorTabsInfo = [
    {
      tabNameComponent: (
        <Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Your space
        </Typography>
      ),
      tabPanelComponent: (
        <VerticalTabs
          handleTabChange={handleYourSpaceTabChange}
          selectedTabIndex={selectedYourSpaceTabIndex}
          tabsInfo={yourSpaceTabsInfo}
        />
      ),
    },
    {
      tabNameComponent: (
        <Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Arrival guide
        </Typography>
      ),
      tabPanelComponent: (
        <VerticalTabs
          handleTabChange={handleArrivalGuideTabChange}
          selectedTabIndex={selectedArrivalGuideTabIndex}
          tabsInfo={arrivalGuideTabsInfo}
        />
      ),
    },
  ];

  return (
    <Container maxWidth="2xl">
      <Grid2 container>
        <Grid2 size={4}>
          <Box className="border-r border-divider">
            <Stack className="flex-row items-center gap-8">
              <IconButton className="size-11 bg-action-hover hover:bg-action-selected">
                <ArrowBackIcon className="size-5" />
              </IconButton>
              <Typography variant="h1">Listing editor</Typography>
            </Stack>
            <Stack className="w-full flex-row gap-1.5 py-6 pl-[4.75rem] pr-16">
              <Tabs
                aria-label="basic tabs example"
                classes={{
                  flexContainer: "bg-action-hover rounded-pill p-1",
                  indicator: "hidden",
                }}
                className="grow"
                value={selectedEditorTabIndex}
                onChange={handleEditorTabChange}
              >
                {editorTabsInfo.map((editorTabInfo, index) => (
                  <Tab
                    key={index}
                    aria-controls={`editor-tabpanel-${index}`}
                    classes={{ selected: "bg-common-white shadow-md" }}
                    className="min-h-0 grow rounded-pill px-3 py-2 text-primary-main hover:bg-common-white"
                    id={`editor-tab-${index}`}
                    label={editorTabInfo.tabNameComponent}
                  />
                ))}
              </Tabs>
              <IconButton className="size-11 bg-action-hover hover:bg-action-selected">
                <TuneIcon className="size-5" />
              </IconButton>
            </Stack>
            {editorTabsInfo.map((yourSpaceTabInfo, index) => (
              <TabPanel
                key={index}
                index={index}
                value={selectedEditorTabIndex}
              >
                {yourSpaceTabInfo.tabPanelComponent}
              </TabPanel>
            ))}
          </Box>
        </Grid2>
        <Grid2 size={8}>{children}</Grid2>
      </Grid2>
    </Container>
  );
}

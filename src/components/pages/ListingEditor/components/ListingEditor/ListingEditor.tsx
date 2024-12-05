"use client";

import { ReactNode } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Tab } from "@/components/atoms/Tab";
import { Tabs } from "@/components/atoms/Tabs";
import { Typography } from "@/components/atoms/Typography";
import { useTabIndex } from "@/hooks/useTabIndex/useTabIndex";
import { TabPanelProps } from "@/utils/common.types";

import { VerticalTabs } from "../VerticalTabs";

import { useListingEditor } from "./ListingEditor.hooks";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`listing-editor-tab-${index}`}
      hidden={value !== index}
      id={`listing-editor-tabpanel-${index}`}
      role="tabpanel"
      {...other}
      className="grow overflow-auto"
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
    <Container className="mr-0 pr-0" maxWidth="2xl">
      <Grid2 container className="h-[calc(100vh-6.375rem)]">
        <Grid2 className="h-full" size={4}>
          <Stack className="h-full border-r border-divider pt-11">
            <Stack className="flex-row items-center gap-8">
              <IconButton className="size-11 bg-action-hover hover:bg-action-selected">
                <ArrowBackIcon className="size-5" />
              </IconButton>
              <Typography variant="h1">Listing editor</Typography>
            </Stack>
            <Stack className="w-full flex-row gap-1.5 py-6 pl-[4.75rem] pr-16">
              <Tabs
                aria-label="Listing editor"
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
                    aria-controls={`listing-editor-tabpanel-${index}`}
                    classes={{ selected: "bg-common-white shadow-md" }}
                    className="min-h-0 grow rounded-pill px-3 py-2 text-primary-main hover:bg-common-white"
                    id={`listing-editor-tab-${index}`}
                    label={editorTabInfo.tabNameComponent}
                  />
                ))}
              </Tabs>
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
          </Stack>
        </Grid2>
        <Grid2 className="h-full" size={8}>
          <Stack className="h-full overflow-auto">{children}</Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}

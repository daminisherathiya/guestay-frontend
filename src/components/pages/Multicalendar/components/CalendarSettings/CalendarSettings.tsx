"use client";

import { Box } from "@/components/atoms/Box";
import { Tab } from "@/components/atoms/Tab";
import { Tabs } from "@/components/atoms/Tabs";
import { Typography } from "@/components/atoms/Typography";
import { useTabIndex } from "@/hooks/useTabIndex";
import { TabPanelProps } from "@/utils/common.types";

import { CalendarPricingTab } from "./CalendarPricingTab";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`calendar-settings-tab-${index}`}
      className="mt-8"
      hidden={value !== index}
      id={`calendar-settings-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export function CalendarSettings() {
  const [selectedCalendarSettingsTabIndex, handleCalendarSettingsTabChange] =
    useTabIndex({
      initialIndex: 0,
    });

  const calendarSettingsTabsInfo = [
    {
      tabNameComponent: (
        <Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Pricing
        </Typography>
      ),
      tabPanelComponent: <CalendarPricingTab />,
    },
    {
      tabNameComponent: (
        <Typography
          className="font-medium lowercase leading-5 first-letter:uppercase"
          variant="body2"
        >
          Availability
        </Typography>
      ),
      tabPanelComponent: <h1>rrr</h1>,
    },
  ];

  return (
    <>
      <Typography className="mb-4 text-[1.625rem] leading-8" variant="h2">
        Settings
      </Typography>
      <Typography className="mb-8">
        These apply to all nights, unless you customise them by date.
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            aria-label="Calendar settings"
            classes={{
              flexContainer: "gap-7",
            }}
            value={selectedCalendarSettingsTabIndex}
            onChange={handleCalendarSettingsTabChange}
          >
            {calendarSettingsTabsInfo.map((calendarSettingsTabInfo, index) => (
              <Tab
                key={index}
                aria-controls={`calendar-settings-tabpanel-${index}`}
                className="min-w-0 items-start px-0"
                id={`calendar-settings-tab-${index}`}
                label={calendarSettingsTabInfo.tabNameComponent}
              />
            ))}
          </Tabs>
        </Box>
        {calendarSettingsTabsInfo.map((calendarSettingsTabInfo, index) => (
          <TabPanel
            key={index}
            index={index}
            value={selectedCalendarSettingsTabIndex}
          >
            {calendarSettingsTabInfo.tabPanelComponent}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}

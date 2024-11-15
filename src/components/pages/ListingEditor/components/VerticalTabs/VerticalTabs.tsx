"use client";

import Link from "next/link";

import { Tab, Tabs } from "@mui/material";

import { VerticalTabsProps } from "./VerticalTabs.types";

export function VerticalTabs({
  handleTabChange,
  selectedTabIndex,
  tabsInfo,
}: VerticalTabsProps) {
  return (
    <Tabs
      aria-label="Vertical tabs example"
      classes={{
        flexContainer: "space-y-4 pl-[4.75rem] pr-16 py-4",
        indicator: "hidden",
      }}
      orientation="vertical"
      value={selectedTabIndex}
      variant="scrollable"
      onChange={handleTabChange}
    >
      {tabsInfo.map((tabInfo, index) => (
        <Tab
          key={index}
          aria-controls={`yourSpace-tabpanel-${index}`}
          classes={{ selected: "!shadow-black" }}
          className="items-start rounded-xl p-5 text-left normal-case shadow-button hover:bg-action-hover"
          component={Link}
          href={tabInfo.onClick}
          id={`yourSpace-tab-${index}`}
          label={tabInfo.tabNameComponent}
        />
      ))}
    </Tabs>
  );
}

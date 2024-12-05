"use client";

import Link from "next/link";

import { Tab } from "@/components/atoms/Tab";
import { Tabs } from "@/components/atoms/Tabs";

import { VerticalTabsProps } from "./VerticalTabs.types";

export function VerticalTabs({
  handleTabChange,
  selectedTabIndex,
  tabsInfo,
}: VerticalTabsProps) {
  return (
    <Tabs
      aria-label="Vertical tabs"
      classes={{
        flexContainer: "space-y-4 pl-[4.75rem] pr-16 pt-4 pb-10",
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
          aria-controls={`vertical-tabpanel-${index}`}
          classes={{ selected: "!shadow-black" }}
          className="rounded-xl p-5 text-left normal-case shadow-button hover:bg-action-hover"
          component={Link}
          href={tabInfo.onClick}
          id={`vertical-tab-${index}`}
          label={tabInfo.tabNameComponent}
        />
      ))}
    </Tabs>
  );
}

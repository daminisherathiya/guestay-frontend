"use client";
import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

export function ArrivalGuideTabs({
  arrivalGuideTabsInfo,
  handleArrivalGuideTabChange,
  selectedArrivalGuideTabIndex,
}) {
  return (
    <Tabs
      aria-label="Vertical tabs example"
      classes={{ flexContainer: "space-y-4 px-16", indicator: "hidden" }}
      orientation="vertical"
      value={selectedArrivalGuideTabIndex}
      variant="scrollable"
      onChange={handleArrivalGuideTabChange}
    >
      {arrivalGuideTabsInfo.map((yourSpaceTabInfo, index) => (
        <Tab
          key={index}
          aria-controls={`arrivalGuide-tabpanel-${index}`}
          classes={{ selected: "!shadow-black" }}
          className="rounded-xl p-5 shadow-button hover:bg-action-hover"
          id={`arrivalGuide-tab-${index}`}
          label={yourSpaceTabInfo.tabNameComponent}
        />
      ))}
    </Tabs>
  );
}

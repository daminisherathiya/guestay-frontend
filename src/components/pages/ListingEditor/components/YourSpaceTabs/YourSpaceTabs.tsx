"use client";
import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

export function YourSpaceTabs({
  selectedYourSpaceTabIndex,
  yourSpaceTabsInfo,
  handleYourSpaceTabChange,
}) {
  return (
    <Tabs
      aria-label="Vertical tabs example"
      classes={{ flexContainer: "space-y-4 px-16", indicator: "hidden" }}
      orientation="vertical"
      value={selectedYourSpaceTabIndex}
      variant="scrollable"
      onChange={handleYourSpaceTabChange}
    >
      {yourSpaceTabsInfo.map((yourSpaceTabInfo, index) => (
        <Tab
          key={index}
          aria-controls={`yourSpace-tabpanel-${index}`}
          classes={{ selected: "!shadow-black" }}
          className="rounded-xl p-5 shadow-button hover:bg-action-hover"
          id={`yourSpace-tab-${index}`}
          label={yourSpaceTabInfo.tabNameComponent}
        />
      ))}
    </Tabs>
  );
}

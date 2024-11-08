"use client";

// import { Tab, Tabs } from "@mui/material";

// import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
// import { useTabIndex } from "@/hooks/useTabIndex/useTabIndex";

// import { ArrivalGuideTabs } from "../ArrivalGuideTabs";
// import { YourSpaceTabs } from "../YourSpaceTabs";

// import { TabPanelProps } from "./ListingEditorTabs.types";

// const yourSpaceTabsInfo = [
//   { tabNameComponent: <p>frfr</p>, tabPanelComponent: <p>yourSpaceHi1</p> },
//   { tabNameComponent: "Password", tabPanelComponent: <p>yourSpaceHi2</p> },
//   {
//     tabNameComponent: "Billing and Payment",
//     tabPanelComponent: <p>yourSpaceHi3</p>,
//   },
//   { tabNameComponent: "Notifications", tabPanelComponent: <p>yourSpaceHi4</p> },
//   { tabNameComponent: "Preferences", tabPanelComponent: <p>yourSpaceHi5</p> },
// ];

// const arrivalGuideTabsInfo = [
//   { tabNameComponent: <p>frfr</p>, tabPanelComponent: <p>arrivalGuideHi1</p> },
//   { tabNameComponent: "Password", tabPanelComponent: <p>arrivalGuideHi2</p> },
//   {
//     tabNameComponent: "Billing and Payment",
//     tabPanelComponent: <p>arrivalGuideHi3</p>,
//   },
// ];

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       aria-labelledby={`listing-editor-tab-${index}`}
//       hidden={value !== index}
//       id={`listing-editor-tabpanel-${index}`}
//       role="tabpanel"
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

export function ListingEditorTabs() {
  // const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
  //   initialIndex: 0,
  // });
  // const [selectedYourSpaceTabIndex, handleYourSpaceTabChange] = useTabIndex({
  //   initialIndex: 0,
  // });
  // const [selectedArrivalGuideTabIndex, handleArrivalGuideTabChange] =
  //   useTabIndex({ initialIndex: 0 });

  // const editorTabsInfo = [
  //   {
  //     tabNameComponent: <p>frfr</p>,
  //     tabPanelComponent: (
  //       <YourSpaceTabs
  //         handleYourSpaceTabChange={handleYourSpaceTabChange}
  //         selectedYourSpaceTabIndex={selectedYourSpaceTabIndex}
  //         yourSpaceTabsInfo={yourSpaceTabsInfo}
  //       />
  //     ),
  //   },
  //   {
  //     tabNameComponent: "Password",
  //     tabPanelComponent: (
  //       <ArrivalGuideTabs
  //         arrivalGuideTabsInfo={arrivalGuideTabsInfo}
  //         handleArrivalGuideTabChange={handleArrivalGuideTabChange}
  //         selectedArrivalGuideTabIndex={selectedArrivalGuideTabIndex}
  //       />
  //     ),
  //   },
  // ];

  return (
    <Stack className="flex-row">
      {/* <Box className="border-r border-divider">
        <Tabs
          aria-label="basic tabs example"
          classes={{ indicator: "hidden" }}
          value={selectedEditorTabIndex}
          onChange={handleEditorTabChange}
        >
          {editorTabsInfo.map((editorTabInfo, index) => (
            <Tab
              key={index}
              aria-controls={`editor-tabpanel-${index}`}
              classes={{ selected: "!shadow-black" }}
              className="rounded-xl p-5 shadow-button hover:bg-action-hover"
              id={`editor-tab-${index}`}
              label={editorTabInfo.tabNameComponent}
            />
          ))}
        </Tabs>
        {editorTabsInfo.map((yourSpaceTabInfo, index) => (
          <TabPanel key={index} index={index} value={selectedEditorTabIndex}>
            {yourSpaceTabInfo.tabPanelComponent}
          </TabPanel>
        ))}
      </Box> */}
      {/* {selectedEditorTabIndex === 0
        ? yourSpaceTabsInfo.map((yourSpaceTabInfo, index) => (
          <TabPanel
            key={index}
              index={index}
            value={selectedYourSpaceTabIndex}
          >
            {yourSpaceTabInfo.tabPanelComponent}
          </TabPanel>
        ))
        : arrivalGuideTabsInfo.map((yourSpaceTabInfo, index) => (
          <TabPanel
            key={index}
            index={index}
            value={selectedArrivalGuideTabIndex}
          >
            {yourSpaceTabInfo.tabPanelComponent}
            </TabPanel>
        ))} */}
    </Stack>
  );
}

import { ReactNode, SyntheticEvent } from "react";

interface TabInfo {
  onClick: string;
  tabNameComponent: ReactNode;
}

export interface VerticalTabsProps {
  handleTabChange: (event: SyntheticEvent, newIndex: number) => void;
  selectedTabIndex: number;
  tabsInfo: TabInfo[];
}

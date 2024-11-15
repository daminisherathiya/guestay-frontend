interface TabInfo {
  onClick: string;
  tabNameComponent: React.ReactNode;
}

export interface VerticalTabsProps {
  handleTabChange: (event: React.SyntheticEvent, newIndex: number) => void;
  selectedTabIndex: number;
  tabsInfo: TabInfo[];
}

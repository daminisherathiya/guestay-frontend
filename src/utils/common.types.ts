import { ReactNode } from "react";

export interface getListingStatusToDisplayType {
  listingSteps: string;
  status: string;
}

export interface getDefaultPropertyTitleType {
  createdAt: string;
}

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

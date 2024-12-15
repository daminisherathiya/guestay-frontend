import { ReactNode } from "react";

export interface SelectWithApplyAndResetProps {
  children: ReactNode;
  handleReset: () => void;
  labelForCount: string;
  onCloseSelectHandler: () => void;
  onSaveSelectHandler: () => number;
  showResetButton: boolean;
}

import { ReactNode } from "react";

export interface SelectWithApplyAndResetHandlers {
  onCloseSelectHandler: () => void;
  onSaveSelectHandler: () => number;
}
export interface SelectWithApplyAndResetProps
  extends SelectWithApplyAndResetHandlers {
  children: ReactNode;
  handleReset: () => void;
  labelForCount: string;
  showResetButton: boolean;
}

export type useSelectWithApplyAndResetProps = SelectWithApplyAndResetHandlers;

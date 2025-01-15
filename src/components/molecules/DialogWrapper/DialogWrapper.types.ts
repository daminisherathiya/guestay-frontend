import { ReactNode } from "react";

export interface DialogWrapperProps {
  children: ReactNode;
  classes?: { paper: string };
  customHeader?: ReactNode;
  dialogActions?: ReactNode;
  dialogActionsClassName?: string;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
}

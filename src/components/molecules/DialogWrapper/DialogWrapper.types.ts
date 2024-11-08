export interface DialogWrapperProps {
  children: React.ReactNode;
  className?: { paper: string };
  customHeader?: React.ReactNode;
  dialogActions?: React.ReactNode;
  dialogActionsClassName?: string;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
}

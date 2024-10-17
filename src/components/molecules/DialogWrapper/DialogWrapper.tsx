import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

import { Dialog } from "@/components/atoms/Dialog";
import { DialogActions } from "@/components/atoms/DialogActions";
import { DialogContent } from "@/components/atoms/DialogContent";
import { DialogTitle } from "@/components/atoms/DialogTitle";
import { IconButton } from "@/components/atoms/IconButton";
import { Slide } from "@/components/atoms/Slide";

type DialogWrapperProps = {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
  dialogActions?: React.ReactNode;
  dialogActionsClassName?: string;
  handleCloseDialog: () => void;
  isDialogOpen: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function DialogWrapper({
  children,
  customHeader,
  dialogActions,
  dialogActionsClassName,
  handleCloseDialog,
  isDialogOpen,
  maxWidth = "xs",
  title,
}: DialogWrapperProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        maxWidth={maxWidth}
        open={isDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseDialog}
      >
        {title ? (
          <DialogTitle
            className="relative min-h-16 p-0 px-4 py-5 text-center text-base font-bold"
            id="scroll-dialog-title"
          >
            <IconButton
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={handleCloseDialog}
            >
              <CloseIcon className="size-5" />
            </IconButton>
            {title}
          </DialogTitle>
        ) : (
          customHeader
        )}
        <DialogContent dividers className="py-6">
          {children}
        </DialogContent>
        {dialogActions && (
          <DialogActions className={dialogActionsClassName}>
            {dialogActions}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

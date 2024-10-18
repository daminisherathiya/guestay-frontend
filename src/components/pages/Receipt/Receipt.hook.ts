import { useState } from "react";

export function useReceipt() {
  const [isFullReceiptPreviewDialogOpen, setFullReceiptPreviewDialogOpen] =
    useState(false);

  const handleOpenFullReceiptPreviewDialog = () => {
    setFullReceiptPreviewDialogOpen(true);
  };

  const handleCloseFullReceiptPreviewDialog = () => {
    setFullReceiptPreviewDialogOpen(false);
  };

  return {
    handleCloseFullReceiptPreviewDialog,
    handleOpenFullReceiptPreviewDialog,
    isFullReceiptPreviewDialogOpen,
  };
}

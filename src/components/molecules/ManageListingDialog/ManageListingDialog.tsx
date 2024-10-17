import Image from "next/image";

import DeleteIcon from "/public/images/delete.svg";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";

type ManageListingDialogProps = {
  handleCloseManageListingDialog: () => void;
  isManageListingDialogOpen: boolean;
};

export function ManageListingDialog({
  handleCloseManageListingDialog,
  isManageListingDialogOpen,
}: ManageListingDialogProps) {
  return (
    <DialogWrapper
      handleCloseDialog={handleCloseManageListingDialog}
      isDialogOpen={isManageListingDialogOpen}
      maxWidth="xs"
      title=""
    >
      <Box className="mx-auto size-36">
        <Image
          alt="Cover picture"
          className="max-h-full max-w-full rounded-lg object-cover"
          height={144}
          src="/images/aa.jpg"
          width={144}
        />
      </Box>
      <Typography
        className="mt-3 text-center font-medium sm:mt-4"
        variant="body2"
      >
        Your House listing
      </Typography>
      <Button className="mt-6 w-full sm:mt-10" size="large" variant="contained">
        Edit listing
      </Button>
      <Button
        className="mt-3 w-full gap-2 no-underline sm:mt-4"
        size="large"
        variant="text"
      >
        <DeleteIcon className="size-5" />
        Remove listing
      </Button>
    </DialogWrapper>
  );
}

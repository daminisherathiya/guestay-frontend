import Image from "next/image";

import DeleteIcon from "/public/images/delete.svg";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";

import { ManageListingDialogProps } from "./ManageListingDialog.types";

export function ManageListingDialog({
  handleCloseManageListingDialog,
  manageListingDialogIsOpen,
  selectedListing,
}: ManageListingDialogProps) {
  if (!selectedListing) return null;

  const coverImage = selectedListing?.images.split(",")[0] || "";

  return (
    <DialogWrapper
      handleCloseDialog={handleCloseManageListingDialog}
      isDialogOpen={manageListingDialogIsOpen}
      maxWidth="xs"
      title=""
    >
      <Box className="mx-auto aspect-[20/19] size-36 overflow-hidden rounded-lg bg-divider">
        {coverImage && (
          <Image
            alt="Cover picture"
            className="h-full max-h-full max-w-full rounded-lg object-cover"
            height={144}
            src={`https://guestay.webarysites.com/file/1000/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
            width={144}
          />
        )}
      </Box>
      <Typography
        className="mt-3 text-center font-medium sm:mt-4"
        variant="body2"
      >
        {selectedListing.title}
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

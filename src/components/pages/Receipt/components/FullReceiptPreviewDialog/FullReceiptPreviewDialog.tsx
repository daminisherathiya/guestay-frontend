import Image from "next/image";

import { Link } from "@mui/material";

import { Avatar } from "@/components/atoms/Avatar";
import { Box } from "@/components/atoms/Box";
import { Divider } from "@/components/atoms/Divider";
import { Grid2 } from "@/components/atoms/Grid2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";
import { getUserInitial } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useFullReceiptPreviewDialog } from "./FullReceiptPreviewDialog.hooks";
import { FullReceiptPreviewDialogProps } from "./FullReceiptPreviewDialog.types";

export function FullReceiptPreviewDialog({
  coverImage,
  handleCloseFullReceiptPreviewDialog,
  isFullReceiptPreviewDialogOpen,
  property,
  propertyApiIsSuccess,
}: FullReceiptPreviewDialogProps) {
  const {
    AmenitiesApiSnackbarAlert,
    locationsApiData,
    LocationsApiSnackbarAlert,
    isLoading,
    selectedAmenities,
  } = useFullReceiptPreviewDialog({ property, propertyApiIsSuccess });

  return (
    <DialogWrapper
      className={{ paper: "h-[36rem]" }}
      handleCloseDialog={handleCloseFullReceiptPreviewDialog}
      isDialogOpen={isFullReceiptPreviewDialogOpen}
      maxWidth="lg"
      title="Full preview"
    >
      {isLoading ? (
        <Skeleton className="size-full rounded-lg" variant="rectangular" />
      ) : (
        <Box className="sm:p-3 lg:p-6">
          {/* eslint-disable-next-line sort-keys */}
          <Grid2 container spacing={{ "2xs": 4, sm: 5, md: 6 }}>
            {/* eslint-disable-next-line sort-keys */}
            <Grid2 className="mx-auto" size={{ "2xs": 12, sm: 10, md: 6 }}>
              <Box className="sticky top-6 ">
                <Image
                  alt="Cover picture"
                  className="h-screen max-h-96 w-full rounded-lg object-cover"
                  height={320}
                  src={`https://guestay.webarysites.com/file/1000/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
                  width={320}
                />
              </Box>
            </Grid2>
            {/* eslint-disable-next-line sort-keys */}
            <Grid2 size={{ "2xs": 12, md: 6 }}>
              <Box>
                <Typography component="h1" variant="h1">
                  {property?.title}
                </Typography>
                <Stack className="justify-between gap-9 py-5 xs:flex-row lg:py-6 xl:py-8">
                  <Box className="order-2 xs:order-1">
                    <Typography component="h2" variant="h2">
                      Entire home hosted by {getUserDetails().fname}
                    </Typography>
                    <Typography className="mt-2">
                      {Number(property?.num_of_people || 0) +
                        Number(property?.no_of_couples || 0)}{" "}
                      guests · {property?.bedrooms || 0} bedrooms ·{" "}
                      {property?.beds || 0} beds · {property?.baths || 0}{" "}
                      bathrooms
                    </Typography>
                  </Box>
                  <Box className="order-1 xs:order-2">
                    <Avatar className="size-14 bg-primary-dark font-medium">
                      {getUserInitial(getUserDetails().fname)}
                    </Avatar>
                  </Box>
                </Stack>
                <Divider />
                <Box className="py-5 lg:py-6 xl:py-8">
                  <Typography>
                    You&apos;ll have a great time at this comfortable place to
                    stay.
                  </Typography>
                </Box>
                <Divider />
                <Box className="py-5 lg:py-6 xl:py-8">
                  <Typography
                    className="mb-6 font-medium"
                    component="h2"
                    variant="body1"
                  >
                    Amenities
                  </Typography>
                  <Box className="space-y-4">
                    {selectedAmenities.map((amenity) => (
                      <Stack
                        key={amenity.id}
                        className="flex-row items-center justify-between [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-divider [&:not(:last-child)]:pb-4"
                      >
                        <Typography className="text-sm first-letter:uppercase">
                          {amenity.title}
                        </Typography>
                        {amenity.icon ? (
                          <Image
                            alt={amenity.title}
                            className="size-6 object-cover"
                            height={24}
                            src={`https://guestay.webarysites.com/data/amenities_icons/${amenity.icon}`}
                            width={24}
                          />
                        ) : (
                          <Box className="size-8 rounded-sm bg-action-disabledBackground/30"></Box>
                        )}
                      </Stack>
                    ))}
                  </Box>
                </Box>
                <Divider />
                <Box className="py-5 lg:py-6 xl:py-8">
                  <Typography
                    className="font-medium"
                    component="h2"
                    variant="body1"
                  >
                    Location
                  </Typography>
                  <Typography className="mt-5" component="h3" variant="body1">
                    {property?.address}{" "}
                    {locationsApiData?.data.find(
                      (location) => location.id === property?.location,
                    )?.label || ""}
                  </Typography>
                  <Typography className="mt-1 text-xs">
                    We&apos;ll only share your address with guests who are
                    booked as outlined in our{" "}
                    <Link href="#">Privacy Policy</Link>
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      )}
      {AmenitiesApiSnackbarAlert}
      {LocationsApiSnackbarAlert}
    </DialogWrapper>
  );
}

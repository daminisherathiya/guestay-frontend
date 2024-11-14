import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Grid2 } from "@/components/atoms/Grid2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { getListingStatusToDisplay } from "@/utils/common";

import { ListingsGridViewProps } from "./ListingsGridView.types";

export function ListingsGridView({
  handleOpenManageListingDialog,
  isLoading,
  listingPropertiesApiData,
  locationsApiData,
}: ListingsGridViewProps) {
  return (
    <>
      {isLoading ? (
        <Grid2 container spacing={2}>
          {Array.from({ length: 9 }).map((_, index) => (
            <Grid2 key={index} size={{ "2xs": 12, md: 4, sm: 6 }}>
              <Skeleton
                className="w-full rounded-lg"
                height={413}
                variant="rectangular"
              />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={3}>
          {listingPropertiesApiData?.data.length === 0 ? (
            <Typography className="flex h-full items-center justify-center p-3">
              No listings available.
            </Typography>
          ) : (
            listingPropertiesApiData?.data.map((listingPropertieData) => {
              const coverImage =
                listingPropertieData?.images.split(",")[0] || "";
              return (
                <Grid2
                  key={listingPropertieData.id}
                  className="cursor-pointer"
                  // eslint-disable-next-line sort-keys
                  size={{ "2xs": 12, sm: 6, lg: 4 }}
                  onClick={() =>
                    handleOpenManageListingDialog(listingPropertieData)
                  }
                >
                  <Box className="relative">
                    <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
                      {coverImage && (
                        <Image
                          alt="Cover picture"
                          className="size-full max-h-full max-w-full object-cover"
                          height={435}
                          src={`https://guestay.webarysites.com/file/1000/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
                          width={413}
                        />
                      )}
                    </Box>
                    <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
                      <Stack className="flex-row items-center gap-2">
                        <Box className="size-3 rounded-full bg-error-main"></Box>
                        <Typography
                          className="font-medium leading-4 first-letter:uppercase"
                          variant="body2"
                        >
                          {getListingStatusToDisplay({
                            listingSteps:
                              listingPropertieData.listing_steps || "",
                            status: listingPropertieData.status,
                          })}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  <Box className="mt-3 pb-8">
                    <Typography className="font-medium">
                      {listingPropertieData.title}
                    </Typography>
                    <Typography className="text-text-secondary">
                      {locationsApiData?.data.find(
                        (location) =>
                          location.id === listingPropertieData.location,
                      )?.label || ""}
                    </Typography>
                  </Box>
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}
    </>
  );
}

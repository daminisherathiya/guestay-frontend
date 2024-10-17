import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

interface ListingsGridViewProps {
  handleOpenManageListingDialog: () => void;
}
export default function ListingsGridView({
  handleOpenManageListingDialog,
}: ListingsGridViewProps) {
  return (
    <Grid2 container spacing={3}>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            />
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            {/* <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            /> */}
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            />
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            {/* <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            /> */}
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            />
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        // eslint-disable-next-line sort-keys
        size={{ "2xs": 12, sm: 6, lg: 4 }}
        onClick={handleOpenManageListingDialog}
      >
        <Box className="relative">
          <Box className="aspect-[20/19] overflow-hidden rounded-lg bg-divider">
            <Image
              alt="Cover picture"
              className="max-h-full w-full max-w-full object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            />
          </Box>
          <Box className="absolute left-4 top-4 rounded-pill bg-common-white px-4 py-3">
            <Stack className="flex-row items-center gap-2">
              <Box className="size-3 rounded-full bg-error-main"></Box>
              <Typography className="font-medium leading-4" variant="body2">
                In progress
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box className="mt-3 pb-8">
          <Typography className="font-medium">The Orchard House</Typography>
          <Typography className="text-text-secondary">
            Bengaluru, Karnataka
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
}

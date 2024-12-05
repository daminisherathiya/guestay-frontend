import Image from "next/image";
import Link from "next/link";

import { Box } from "@/components/atoms/Box";
import { Grid2 } from "@/components/atoms/Grid2";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditableSection } from "../ListingEditableSection";

export function PhotoTourEdit() {
  return (
    <>
      <ListingEditableSection title="Photo tour">
        <Typography className="mb-12 text-text-secondary">
          Manage photos and add details. Guests will only see your tour if every
          room has a photo.
        </Typography>
        <Grid2 container columnSpacing={2} rowSpacing={5}>
          <Grid2 size={4}>
            <Link href="#">
              <Box>
                <Box className="flex aspect-[192/219] items-center justify-center overflow-hidden rounded-lg bg-action-hover">
                  <Image
                    alt="Bedrrom"
                    height={200}
                    src="/images/bedroomPlaceholder.webp"
                    width={200}
                  />
                </Box>
                <Box className="mt-3">
                  <Typography className="font-medium" component="h3">
                    Bedroom
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Add photos
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid2>
          <Grid2 size={4}>
            <Link href="#">
              <Box>
                <Box className="flex aspect-[192/219] items-center justify-center overflow-hidden rounded-lg bg-action-hover">
                  <Image
                    alt="Full bathroom"
                    height={200}
                    src="/images/fullBathroomPlaceholder.webp"
                    width={200}
                  />
                </Box>
                <Box className="mt-3">
                  <Typography className="font-medium" component="h3">
                    Full bathroom
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Add photos
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid2>
          <Grid2 size={4}>
            <Link href="#">
              <Box>
                <Box className="flex aspect-[192/219] items-center justify-center overflow-hidden rounded-lg bg-action-hover">
                  <Image
                    alt="Workspace"
                    height={200}
                    src="/images/workspacePlaceholder.webp"
                    width={200}
                  />
                </Box>
                <Box className="mt-3">
                  <Typography className="font-medium" component="h3">
                    Workspace
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Add photos
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid2>
          <Grid2 size={4}>
            <Link href="#">
              <Box>
                <Box className="flex aspect-[192/219] items-center justify-center overflow-hidden rounded-lg bg-action-hover">
                  <Image
                    alt="Exterior"
                    height={200}
                    src="/images/exteriorPlaceholder.webp"
                    width={200}
                  />
                </Box>
                <Box className="mt-3">
                  <Typography className="font-medium" component="h3">
                    Exterior
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Add photos
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid2>
        </Grid2>
      </ListingEditableSection>
    </>
  );
}

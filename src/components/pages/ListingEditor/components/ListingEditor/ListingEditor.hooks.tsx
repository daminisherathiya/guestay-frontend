import Image from "next/image";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditorTab } from "../ListingEditorTab";

export function useListingEditor() {
  const yourSpaceTabsInfo = [
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Photo tour">
          <Typography className="leading-5 text-text-secondary">
            1 bedrooms · 1 bed · 1 bath
          </Typography>
          <Box>
            <Stack className="relative mt-8 flex-row items-end justify-center">
              <Box className="relative z-[1] size-40 overflow-hidden rounded-xl shadow-md">
                <Image
                  alt="Logo"
                  className="w-full"
                  height={160}
                  src="/images/aa.jpg"
                  width={160}
                />
                <Chip
                  className="absolute left-3 top-3 bg-common-white text-text-secondary"
                  label="5 Photos"
                />
              </Box>
              <Box className="absolute bottom-2 left-2 size-32 -rotate-3 overflow-hidden rounded-xl shadow-md">
                <Image
                  alt="Logo"
                  className="w-full"
                  height={136}
                  src="/images/aa.jpg"
                  width={136}
                />
              </Box>
              <Box className="absolute bottom-2 right-2 size-32 rotate-3 overflow-hidden rounded-xl shadow-md">
                <Image
                  alt="Logo"
                  className="w-full"
                  height={136}
                  src="/images/aa.jpg"
                  width={136}
                />
              </Box>
            </Stack>
          </Box>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/title",
      tabNameComponent: (
        <ListingEditorTab title="Title">
          <Typography className="text-xl font-medium leading-6 text-text-secondary">
            Charming Loft Near Attractions with Private Patio
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Property type">
          <Typography className="leading-5 text-text-secondary">
            Entire place · House
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/pricing",
      tabNameComponent: (
        <ListingEditorTab title="Pricing">
          <Typography className="leading-5 text-text-secondary">
            ₹2,455 per night
          </Typography>
          <Typography className="leading-5 text-text-secondary">
            ₹1,000 weekend price
          </Typography>
          <Typography className="leading-5 text-text-secondary">
            8% weekly discount
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/availability",
      tabNameComponent: (
        <ListingEditorTab title="Availability">
          <Typography className="leading-5 text-text-secondary">
            1–365 night stays
          </Typography>
          <Typography className="leading-5 text-text-secondary">
            Same-day advance notice
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Number of guests">
          <Typography className="leading-5 text-text-secondary">
            4 guests
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Description">
          <Typography className="leading-5 text-text-secondary">
            You&apos;ll have a great time at this comfortable place to stay.
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Amenities">
          <Box>
            <Stack className="flex-row items-center gap-4 py-2 text-primary-main">
              <AcUnitIcon />
              <Typography className="leading-5">Air conditioning</Typography>
            </Stack>
            <Stack className="flex-row items-center gap-4 py-2 text-primary-main">
              <AcUnitIcon />
              <Typography className="leading-5">Dedicated workspace</Typography>
            </Stack>
            <Stack className="flex-row items-center gap-4 py-2 text-primary-main">
              <AcUnitIcon />
              <Typography className="leading-5">First aid kit</Typography>
            </Stack>
          </Box>
          <Typography variant="body2">+ 7 more</Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Accessibility features">
          <Typography className="leading-5 text-text-secondary">
            Add details
          </Typography>
        </ListingEditorTab>
      ),
    },
  ];

  const arrivalGuideTabsInfo = [
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <Stack className="w-full flex-row justify-between">
          <ListingEditorTab title="Check-in">
            <Typography className="leading-5 text-text-secondary">
              3:00 pm
            </Typography>
          </ListingEditorTab>
          <Box className="w-full border-l border-divider text-right">
            <ListingEditorTab title="Checkout">
              <Typography className="leading-5 text-text-secondary">
                Add details
              </Typography>
            </ListingEditorTab>
          </Box>
        </Stack>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Directions">
          <Typography className="leading-5 text-text-secondary">
            Add details
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Wifi details">
          <Typography className="leading-5 text-text-secondary">
            Add details
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="House manual">
          <Box>
            <Stack className="flex-row items-center gap-4 py-2 text-primary-main">
              <AccessTimeIcon />
              <Typography className="leading-5">
                Check-in after 3:00 pm
              </Typography>
            </Stack>
            <Stack className="flex-row items-center gap-4 py-2 text-primary-main">
              <PeopleAltOutlinedIcon />
              <Typography className="leading-5">4 guests maximum</Typography>
            </Stack>
          </Box>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Checkout instructions">
          <Typography className="leading-5 text-text-secondary">
            Add details
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Guidebooks">
          <Typography className="leading-5 text-text-secondary">
            Create a guidebook to share your local tips with guests.
          </Typography>
        </ListingEditorTab>
      ),
    },
    {
      onClick: "/hosting/listings/editor/2/details/photo-tour",
      tabNameComponent: (
        <ListingEditorTab title="Interaction preferences">
          <Typography className="leading-5 text-text-secondary">
            Add details
          </Typography>
        </ListingEditorTab>
      ),
    },
  ];

  return { arrivalGuideTabsInfo, yourSpaceTabsInfo };
}

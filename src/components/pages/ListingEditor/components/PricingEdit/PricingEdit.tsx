import { Stack } from "@mui/material";

import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditableSection } from "../ListingEditableSection";

export function PricingEdit() {
  return (
    <ListingEditableSection title="Pricing">
      <Typography className="mb-12 text-text-secondary">
        These settings apply to all nights, unless you customise them by date.{" "}
        <Button
          disableRipple
          className="p-0 font-medium text-text-secondary"
          variant="text"
          // onClick={setDiscountsDialogIsOpenTrue}
        >
          Learn more
        </Button>
      </Typography>
      <Stack className="gap-4">
        <Typography className="mb-6 font-medium" variant="h3">
          Nightly price
        </Typography>
      </Stack>
      <Stack className="mt-12 gap-4">
        <Typography className="mb-6 font-medium" variant="h3">
          Discounts
        </Typography>
      </Stack>
    </ListingEditableSection>
  );
}

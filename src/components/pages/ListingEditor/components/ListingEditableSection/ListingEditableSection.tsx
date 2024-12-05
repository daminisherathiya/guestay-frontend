import { Box } from "@/components/atoms/Box";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditableSectionProps } from "./ListingEditableSection.types";

export function ListingEditableSection({
  title,
  children,
}: ListingEditableSectionProps) {
  return (
    <>
      <Box className="sticky top-0 mx-auto w-3/4 bg-common-white pb-5 pt-11">
        <Typography component="h2" variant="h1">
          {title}
        </Typography>
      </Box>
      <Box className="mx-auto w-3/4">{children}</Box>
    </>
  );
}

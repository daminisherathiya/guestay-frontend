import { Box } from "@/components/atoms/Box";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditorTabProps } from "./ListingEditorTab.types";

export function ListingEditorTab({ title, children }: ListingEditorTabProps) {
  return (
    <>
      <Box className="w-full space-y-2">
        <Typography className="font-medium leading-5 text-primary-main">
          {title}
        </Typography>
        {children}
      </Box>
    </>
  );
}

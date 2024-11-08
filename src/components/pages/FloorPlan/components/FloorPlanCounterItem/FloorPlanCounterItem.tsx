import Image from "next/image";

import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { FloorPlanCounterItemProps } from "./FloorPlanCounterItem.types";

export function FloorPlanCounterItem({
  counter,
  displayValue,
  floorPlanItem,
  handleDecrease,
  handleIncrease,
  isLoading,
}: FloorPlanCounterItemProps) {
  return (
    <Stack className="flex-row items-center justify-between border-b-divider py-6 [&:not(:last-child)]:border-b">
      <Typography component="p" variant="h3">
        {floorPlanItem.name}
      </Typography>
      <Stack className="w-[6.5rem] flex-row items-center justify-between">
        <IconButton
          className={`flex size-8 items-center justify-center border border-solid border-divider ${
            counter === 0 || isLoading ? "pointer-events-none opacity-30" : ""
          }`}
          disabled={counter === 0 || isLoading}
          onClick={() => handleDecrease(floorPlanItem.field)}
        >
          <Image alt="Minus" height={12} src="/images/minus.svg" width={12} />
        </IconButton>
        <Typography>{displayValue(counter)}</Typography>
        <IconButton
          className={`flex size-8 items-center justify-center border border-solid border-divider ${
            counter === floorPlanItem.max || isLoading
              ? "pointer-events-none opacity-30"
              : ""
          }`}
          disabled={counter === floorPlanItem.max || isLoading}
          onClick={() => handleIncrease(floorPlanItem.field, floorPlanItem.max)}
        >
          <Image alt="Plus" height={12} src="/images/plus.svg" width={12} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

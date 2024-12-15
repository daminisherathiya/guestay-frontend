import Image from "next/image";

import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useCounterWithLabel } from "./CounterWithLabel.hooks";
import { CounterWithLabelProps } from "./CounterWithLabel.types";

export function CounterWithLabel({
  classes,
  counter,
  description,
  isLoading,
  label,
  maxCount = 50,
  minCount = 0,
  setCounters,
  steps = 1,
}: CounterWithLabelProps) {
  const { handleDecrease, handleIncrease } = useCounterWithLabel({
    maxCount,
    minCount,
    setCounters,
    steps,
  });

  return (
    <Stack
      className={`flex-row items-center justify-between gap-6 ${classes.counterWithLabel}`}
    >
      <Stack className="gap-1">
        <Typography className={classes.label} component="p" variant="h3">
          {label}
        </Typography>
        <Typography className="text-text-secondary" variant="body2">
          {description}
        </Typography>
      </Stack>
      <Stack className="w-[6.5rem] flex-row items-center justify-between gap-3">
        <IconButton
          className={`flex size-8 items-center justify-center border border-solid border-divider ${
            counter === minCount || isLoading
              ? "pointer-events-none opacity-30"
              : ""
          }`}
          disabled={counter === minCount || isLoading}
          onClick={() => handleDecrease()}
        >
          <Image alt="Minus" height={12} src="/images/minus.svg" width={12} />
        </IconButton>
        <Typography>{counter}</Typography>
        <IconButton
          className={`flex size-8 items-center justify-center border border-solid border-divider ${
            counter === maxCount || isLoading
              ? "pointer-events-none opacity-30"
              : ""
          }`}
          disabled={counter === maxCount || isLoading}
          onClick={() => handleIncrease()}
        >
          <Image alt="Plus" height={12} src="/images/plus.svg" width={12} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

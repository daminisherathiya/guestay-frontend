import Link from "next/link";

import { Box } from "@/components/atoms/Box";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE } from "@/providers/MulticalendarProvider/MulticalendarProvider.consts";

import { useCalendarPricingTab } from "./CalendarPricingTab.hooks";

export function CalendarPricingTab() {
  const {
    hasWeekendPrice,
    isPropertyPricingInfoApiIsLoading,
    managePropertyPricingApiIsPending,
    router,
    setPrice,
    setRemoveWeekendPriceIsTriggered,
    weekdayPrice,
    weekendPrice,
  } = useCalendarPricingTab();

  return (
    <Stack className="gap-8">
      <Stack className="gap-4">
        <Stack className="grow flex-row items-center justify-between">
          <Typography variant="h2">Base price</Typography>
          <Typography className="text-xs font-medium" variant="body2">
            USD
          </Typography>
        </Stack>
        <Link href="./pricing-settings/rates/base">
          <Box className="space-y-2 rounded-2xl border border-divider p-6">
            <Typography variant="body2">Per night</Typography>
            {isPropertyPricingInfoApiIsLoading ? (
              <Skeleton className="h-9 w-32" variant="text" />
            ) : (
              <Typography className="text-3xl font-bold">
                ${weekdayPrice}
              </Typography>
            )}
          </Box>
        </Link>

        <Stack className="flex-row items-start justify-between rounded-2xl border border-divider p-6">
          <Link href="./pricing-settings/rates/weekend">
            <Box className="space-y-2">
              <Typography variant="body2">Custom weekend price</Typography>
              {isPropertyPricingInfoApiIsLoading ? (
                <Skeleton className="h-9 w-32" variant="text" />
              ) : (
                hasWeekendPrice && (
                  <Typography className="text-3xl font-bold">
                    ${weekendPrice}
                  </Typography>
                )
              )}
            </Box>
          </Link>
          <LoadingButton
            classes={{ loadingIndicator: "text-text-primary text-xs" }}
            className="-m-2.5 p-2.5 font-medium"
            disabled={managePropertyPricingApiIsPending}
            loading={managePropertyPricingApiIsPending}
            loadingIndicator="Removing..."
            onClick={() => {
              if (hasWeekendPrice) {
                setPrice(WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE);
                setRemoveWeekendPriceIsTriggered(true);
              } else {
                router.push(`./pricing-settings/rates/weekend`);
              }
            }}
          >
            {hasWeekendPrice ? "Remove" : "Add"}
          </LoadingButton>
        </Stack>
      </Stack>
      <Stack className="hidden gap-4">
        <Stack className="grow">
          <Typography variant="h2">Discounts</Typography>
          <Typography className="mb-2 mt-1 text-text-secondary" variant="body2">
            Adjust your pricing to attract more guests.
          </Typography>
        </Stack>
        <Link href="./pricing-settings/discounts/weekly">
          <Box className="rounded-2xl border border-divider p-6">
            <Typography variant="body2">Weekly</Typography>
            <Typography
              className="mt-1 text-xs text-text-secondary"
              variant="body2"
            >
              For 7 nights or more
            </Typography>
            <Stack className="mt-2.5 flex-row items-end justify-between gap-3">
              <Typography className="text-3xl font-bold">25%</Typography>
              <Typography
                className="text-xs text-text-secondary"
                variant="body2"
              >
                Weekly average is $515
              </Typography>
            </Stack>
          </Box>
        </Link>
        <Link href="./pricing-settings/discounts/monthly">
          <Box className="rounded-2xl border border-divider p-6">
            <Typography variant="body2">Monthly</Typography>
            <Typography
              className="mt-1 text-xs text-text-secondary"
              variant="body2"
            >
              For 28 nights or more
            </Typography>
            <Stack className="mt-2.5 flex-row items-end justify-between gap-3">
              <Typography className="text-3xl font-bold">15%</Typography>
              <Typography
                className="text-xs text-text-secondary"
                variant="body2"
              >
                Monthly average is $2,040
              </Typography>
            </Stack>
          </Box>
        </Link>
      </Stack>
    </Stack>
  );
}

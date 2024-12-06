import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { MoreAboutPricingDialog } from "@/components/pages/Price/components/MoreAboutPricingDialog";
import { formatNumberWithCommas } from "@/components/pages/Price/Price.utils";
import { roundNumber } from "@/utils/common";

import { usePriceWithTaxCalculation } from "./PriceWithTaxCalculation.hooks";
import { PriceWithTaxCalculationProps } from "./PriceWithTaxCalculation.types";

export function PriceWithTaxCalculation({
  commissionPrice,
  handleInput,
  hideLearnMore = false,
  insurancePolicyPrice,
  isLoading,
  price,
  priceEditable = false,
  priceError,
  priceVisibleInitialValue = true,
  textSize = "small",
}: PriceWithTaxCalculationProps) {
  const {
    handleEditClick,
    isEditing,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    priceInputRef,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
  } = usePriceWithTaxCalculation({
    priceVisibleInitialValue: priceVisibleInitialValue,
  });

  return (
    <>
      <Stack className="flex max-h-96 flex-1 justify-center">
        <Stack className="flex-row items-baseline justify-center">
          {isLoading ? (
            <Skeleton
              className="w-full rounded-lg"
              height={103}
              variant="rectangular"
            />
          ) : (
            <>
              <TextField
                autoComplete="off"
                disabled={priceEditable}
                error={!!priceError}
                helperText={priceError}
                id="outlined-basic"
                inputRef={priceInputRef}
                slotProps={{
                  formHelperText: { className: "mt-0 mx-2" },
                  input: {
                    classes: {
                      input: `py-0 ${priceEditable ? "shrink text-left w-auto" : ""}`,
                      notchedOutline: "border-none",
                    },
                    className: `pl-0 ${textSize === "large" ? "text-5xl sm:text-6xl md:text-7xl max-w-80" : "text-5xl max-w-52"} font-bold`,
                    startAdornment: (
                      <Typography
                        className={`font-bold ${priceEditable ? "w-full grow text-right" : ""} ${textSize === "large" ? "text-5xl sm:text-6xl md:text-7xl" : "text-5xl"}`}
                      >
                        $
                      </Typography>
                    ),
                  },
                }}
                value={price}
                variant="outlined"
                onBlur={setIsEditingFalse}
                onFocus={setIsEditingTrue}
                onInput={handleInput}
              />
              <Box
                className={`${!isEditing ? "" : "opacity-0"} ${priceEditable ? "hidden" : ""}`}
              >
                <IconButton
                  className="size-8 border border-solid border-divider"
                  onClick={handleEditClick}
                >
                  <EditIcon className="size-4" />
                </IconButton>
              </Box>
            </>
          )}
        </Stack>
        <Stack
          className={`cursor-pointer flex-row items-center justify-center gap-x-1 ${isPriceVisible ? "hidden" : "mt-6 flex"}`}
          onClick={setIsPriceVisibleTrue}
        >
          <Typography
            className={`${textSize === "large" ? "" : "text-sm"}`}
            variant="h3"
          >
            Guest price before taxes ${price}
          </Typography>
          <Box>
            <KeyboardArrowDownIcon />
          </Box>
        </Stack>
        <Stack className={`mt-8 gap-y-3 ${isPriceVisible ? "flex" : "hidden"}`}>
          <Button
            disableRipple
            className="inline-block p-0 no-underline hover:bg-common-white"
          >
            <Box className="rounded-xl border-2 p-4">
              <Stack className="flex-row justify-between gap-2">
                <Typography
                  className={`text-left font-medium ${textSize === "large" ? "" : "text-sm"}`}
                  variant="h3"
                >
                  Guest price before taxes
                </Typography>
                <Typography
                  className={`font-medium ${textSize === "large" ? "" : "text-sm"}`}
                  variant="h3"
                >
                  ${price}
                </Typography>
              </Stack>
            </Box>
          </Button>
          <Button
            disableRipple
            className="inline-block p-0 no-underline hover:bg-common-white"
          >
            <Box className="rounded-xl border-2 p-4">
              <Box className="pt-2">
                <Box className="space-y-2">
                  <Stack className="flex-row justify-between gap-2">
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      Base price
                    </Typography>
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      ${price}
                    </Typography>
                  </Stack>
                  <Stack className="flex-row justify-between gap-2">
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      Commission Fee
                    </Typography>
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      -${formatNumberWithCommas(commissionPrice)}
                    </Typography>
                  </Stack>
                  <Stack className="flex-row justify-between gap-2">
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      Insurance Policy
                    </Typography>
                    <Typography
                      className={`${textSize === "large" ? "" : "text-sm"}`}
                      variant="h3"
                    >
                      -${formatNumberWithCommas(insurancePolicyPrice)}
                    </Typography>
                  </Stack>
                </Box>
                <Divider className="mb-4 mt-2 pt-2" />
              </Box>
              <Stack className="flex-row justify-between gap-2">
                <Typography
                  className={`font-medium ${textSize === "large" ? "" : "text-sm"}`}
                  variant="h3"
                >
                  You earn
                </Typography>
                <Typography
                  className={`font-medium ${textSize === "large" ? "" : "text-sm"}`}
                  variant="h3"
                >
                  $
                  {formatNumberWithCommas(
                    roundNumber(
                      parseFloat(price.replace(/,/g, "")) -
                        parseFloat(commissionPrice) -
                        parseFloat(insurancePolicyPrice),
                    ),
                  )}
                </Typography>
              </Stack>
            </Box>
          </Button>
        </Stack>
        <Stack
          className={`mt-5 cursor-pointer flex-row justify-center gap-x-1 text-center ${isPriceVisible ? "flex" : "hidden"}`}
          onClick={setIsPriceVisibleTrue}
        >
          <Typography variant="h3">Show less</Typography>
          <Box>
            <KeyboardArrowDownIcon />
          </Box>
        </Stack>
      </Stack>
      <Box className={`mt-6 text-center ${hideLearnMore ? "hidden" : ""}`}>
        <Button
          disableRipple
          className="p-0 text-xs font-normal text-text-secondary"
          variant="text"
          onClick={() => setMoreAboutPricingDialogIsOpenTrue()}
        >
          Learn more about pricing
        </Button>
        <MoreAboutPricingDialog
          handleCloseMoreAboutPricingDialog={
            setMoreAboutPricingDialogIsOpenFalse
          }
          isMoreAboutPricingDialogOpen={moreAboutPricingDialogIsOpen}
        />
      </Box>
    </>
  );
}

"use client";

import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { roundNumber } from "@/utils/common";

import { MoreAboutPricingDialog } from "./components/MoreAboutPricingDialog";
import { usePrice } from "./Price.hooks";

export function Price() {
  const {
    commissionRates,
    Footer,
    // globalPricesApiData,
    globalPricesApiSnackbarAlert,
    handleEditClick,
    handleInput,
    insurancePolicyPrice,
    isEditing,
    isLoading,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    price,
    priceInputRef,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
  } = usePrice();

  return (
    <>
      <Container className="flex h-full grow flex-col" maxWidth="2xl">
        <Stack className="mx-auto h-full max-w-2xl grow justify-center">
          <Box>
            <Typography className="mb-2" component="h1" variant="h1">
              Now, set your price
            </Typography>
            <Typography
              className="mb-8 text-text-secondary"
              component="h3"
              variant="h3"
            >
              You can change it anytime.
            </Typography>
          </Box>
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
                    id="outlined-basic"
                    inputRef={priceInputRef}
                    slotProps={{
                      input: {
                        classes: {
                          input: "py-0",
                          notchedOutline: "border-none",
                        },
                        className:
                          "pl-0 text-5xl sm:text-6xl md:text-7xl font-bold max-w-80",
                        startAdornment: (
                          <Typography className="text-5xl font-bold sm:text-6xl md:text-7xl">
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
                  <Box className={`${!isEditing ? "" : "opacity-0"}`}>
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
              className={`cursor-pointer flex-row justify-center gap-x-1 ${isPriceVisible ? "hidden" : "flex"}`}
              onClick={setIsPriceVisibleTrue}
            >
              <Typography variant="h3">
                Guest price before taxes ${price}
              </Typography>
              <Box>
                <KeyboardArrowDownIcon />
              </Box>
            </Stack>
            <Stack
              className={`mt-8 gap-y-3 ${isPriceVisible ? "flex" : "hidden"}`}
            >
              <Button
                disableRipple
                className="inline-block p-0 no-underline hover:bg-common-white"
              >
                <Box className="rounded-xl border-2 p-4">
                  <Stack className="flex-row justify-between gap-2">
                    <Typography className="text-left font-medium" variant="h3">
                      Guest price before taxes
                    </Typography>
                    <Typography className="font-medium" variant="h3">
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
                        <Typography variant="h3">Base price</Typography>
                        <Typography variant="h3">${price}</Typography>
                      </Stack>
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Commission Fee</Typography>
                        <Typography variant="h3">
                          -${commissionRates}
                        </Typography>
                      </Stack>
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Insurance Policy</Typography>
                        <Typography variant="h3">
                          -${insurancePolicyPrice}
                        </Typography>
                      </Stack>
                    </Box>
                    <Divider className="mb-4 mt-2 pt-2" />
                  </Box>
                  <Stack className="flex-row justify-between gap-2">
                    <Typography className="font-medium" variant="h3">
                      You earn
                    </Typography>
                    <Typography className="font-medium" variant="h3">
                      $
                      {roundNumber(
                        parseFloat(price.replace(/,/g, "")) -
                          parseFloat(commissionRates) -
                          parseFloat(insurancePolicyPrice),
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
          <Box className="mt-6 text-center">
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
        </Stack>
      </Container>
      {Footer}
      {globalPricesApiSnackbarAlert}
      {PropertyApiSnackbarAlert}
      {SavePropertyApiSnackbarAlert}
    </>
  );
}

"use client";

import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Skeleton } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";

import { MoreAboutPricingDialog } from "./components/MoreAboutPricingDialog";
import { usePrice } from "./Price.hooks";

export function Price() {
  const {
    expanded,
    Footer,
    // globalPricesApiData,
    globalPricesApiSnackbarAlert,
    handleEditClick,
    handleInput,
    inputRef,
    isEditing,
    isLoading,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
    toggleExpansion,
    value,
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
                    inputRef={inputRef}
                    slotProps={{
                      input: {
                        classes: {
                          input: "py-0",
                          notchedOutline: "border-none",
                        },
                        className:
                          "pl-0 text-5xl sm:text-6xl md:text-7xl font-bold max-w-72",
                        startAdornment: (
                          <Typography className="text-5xl font-bold sm:text-6xl md:text-7xl">
                            $
                          </Typography>
                        ),
                      },
                    }}
                    value={value}
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
                Guest price before taxes $6,077
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
                onClick={() => toggleExpansion(1)}
              >
                <Box className="rounded-xl border-2 p-4">
                  <Box
                    className={`pt-2 ${
                      expanded === 1 ? "h-full" : "h-0"
                    } overflow-hidden`}
                  >
                    <Box className="space-y-2">
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Base price</Typography>
                        <Typography variant="h3">$5,325</Typography>
                      </Stack>
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Guest service fee</Typography>
                        <Typography variant="h3">$5</Typography>
                      </Stack>
                    </Box>
                    <Divider className="mb-4 mt-2 pt-2" />
                  </Box>
                  <Stack className="flex-row justify-between gap-2 pb-2">
                    <Typography className="text-left font-medium" variant="h3">
                      Guest price before taxes
                    </Typography>
                    <Typography className="font-medium" variant="h3">
                      $5,325
                    </Typography>
                  </Stack>
                </Box>
              </Button>
              <Button
                disableRipple
                className="inline-block p-0 no-underline hover:bg-common-white"
                onClick={() => toggleExpansion(2)}
              >
                <Box className="rounded-xl border-2 p-4">
                  <Box
                    className={`pt-2 ${
                      expanded === 2 ? "h-full" : "h-0"
                    } overflow-hidden`}
                  >
                    <Box className="space-y-2">
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Base price</Typography>
                        <Typography variant="h3">$5,325</Typography>
                      </Stack>
                      <Stack className="flex-row justify-between gap-2">
                        <Typography variant="h3">Host service fee</Typography>
                        <Typography variant="h3">-$160</Typography>
                      </Stack>
                    </Box>
                    <Divider className="mb-4 mt-2 pt-2" />
                  </Box>
                  <Stack className="flex-row justify-between gap-2">
                    <Typography className="font-medium" variant="h3">
                      You earn
                    </Typography>
                    <Typography className="font-medium" variant="h3">
                      $5,165
                    </Typography>
                  </Stack>
                </Box>
              </Button>
            </Stack>
            <Stack
              className={`mt-10 cursor-pointer flex-row justify-center gap-x-1 text-center ${isPriceVisible ? "flex" : "hidden"}`}
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

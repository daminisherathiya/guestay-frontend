"use client";

import Image from "next/image";
import Link from "next/link";

import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { Avatar } from "@/components/atoms/Avatar";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { IconButton } from "@/components/atoms/IconButton";
import { MenuItem } from "@/components/atoms/MenuItem";
import { OutlinedInput } from "@/components/atoms/OutlinedInput";
import { Select } from "@/components/atoms/Select/Select";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { HostCalendar } from "./components/HostCalendar";
import { CALENDAR_VIEW_OPTIONS } from "./Multicalendar.consts";
import { useMulticalendar } from "./Multicalendar.hooks";
import {
  MulticalendarProps,
  RadioButtonIconProps,
} from "./Multicalendar.types";

function RadioButtonIcon({ isSelected }: RadioButtonIconProps) {
  return isSelected ? (
    <RadioButtonCheckedIcon color="primary" />
  ) : (
    <RadioButtonUncheckedIcon color="action" />
  );
}

export function Multicalendar({ children }: MulticalendarProps) {
  const {
    blockedDates,
    calenderSettings,
    getPriceForDate,
    handlePropertyChange,
    handleShowOptionChange,
    isPropertyPricingInfoApiIsLoading,
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    selectedCalenderViewOptionValue,
    selectedCells,
    selectedPropertyValue,
    setSelectedCells,
    toggleCalenderSettings,
  } = useMulticalendar();

  // useEffect(() => {
  //   if (calendarRef?.current) {
  //     if (selectedShowOptionValue === 1) {
  //       calendarRef.current.getApi().changeView("multiMonth");
  //     } else {
  //       calendarRef.current.getApi().changeView("multiMonthYear");
  //     }
  //   }
  // }, [selectedShowOptionValue]);

  return (
    <Container className="m-0 mx-auto p-0" maxWidth="3xl">
      <Stack className="h-[calc(100vh-6.375rem)] border-t border-divider">
        <Stack className="h-full flex-row items-start">
          <Box className="no-scrollbar size-full grow overflow-auto">
            <Stack className=" sticky top-0 z-[3] flex-row items-center justify-between bg-common-white p-6">
              <Box>
                {/* <Typography className="text-[1.625rem] leading-8" variant="h2">
                  November 2023
                </Typography> */}
                <Link className="pt-1.5 text-xs underline" href="#">
                  1 discount
                </Link>
              </Box>
              <Box className="flex items-center gap-3">
                <Select
                  classes={{
                    icon: "w-5 right-3",
                    select: "p-1.5 pr-8 max-w-72",
                  }}
                  IconComponent={KeyboardArrowDownIcon}
                  id="demo-simple-select"
                  input={
                    <OutlinedInput
                      classes={{
                        notchedOutline: "rounded-pill",
                      }}
                    />
                  }
                  labelId="demo-simple-select-label"
                  MenuProps={{
                    anchorOrigin: {
                      horizontal: "right",
                      vertical: "bottom",
                    },
                    classes: {
                      list: "max-h-[21.875rem] overflow-auto w-96",
                      paper: "rounded-xl mt-2",
                    },
                    transformOrigin: {
                      horizontal: "right",
                      vertical: "top",
                    },
                  }}
                  renderValue={(value) => {
                    const selected = listingPropertiesApiData?.data.find(
                      (listingProperty) => Number(listingProperty.id) === value,
                    );
                    const coverImage = selected?.images.split(",")[0] || "";
                    return (
                      <Stack className="flex-row items-center gap-3">
                        {coverImage ? (
                          <Avatar
                            className="size-7"
                            src={`https://guestay.webarysites.com/file/28/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
                          />
                        ) : (
                          <HomeIcon className="block size-7 rounded-full bg-action-hover text-text-secondary/20" />
                        )}
                        {listingPropertiesApiIsFirstLoading ? (
                          <Skeleton className="w-32" variant="text" />
                        ) : (
                          <Typography className="truncate" variant="body2">
                            {selected?.title}
                          </Typography>
                        )}
                        <Divider
                          flexItem
                          className="mr-0.5"
                          orientation="vertical"
                          variant="middle"
                        />
                      </Stack>
                    );
                  }}
                  value={selectedPropertyValue}
                  onChange={handlePropertyChange}
                >
                  {listingPropertiesApiData?.data.map((listingProperty) => {
                    const coverImage =
                      listingProperty?.images.split(",")[0] || "";
                    return (
                      <MenuItem
                        key={listingProperty.id}
                        className="px-6 py-4"
                        value={Number(listingProperty.id)}
                      >
                        <Stack className="w-full flex-row items-center">
                          <Stack className="w-full flex-row items-center justify-between gap-2">
                            <Stack className="flex-row items-center gap-2">
                              <Box className="size-14 shrink-0 overflow-hidden rounded-lg">
                                {coverImage ? (
                                  <Image
                                    alt="Cover picture"
                                    className="size-full max-h-full max-w-full object-cover"
                                    height={60}
                                    src={`https://guestay.webarysites.com/file/60/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
                                    width={60}
                                  />
                                ) : (
                                  <HomeIcon className="block size-full max-h-full max-w-full bg-action-hover text-text-secondary/20" />
                                )}
                              </Box>
                              <Box>
                                <Typography
                                  className="line-clamp-2 text-wrap font-medium"
                                  variant="body2"
                                >
                                  {listingProperty.title}
                                </Typography>
                                <Typography
                                  className="text-xs text-text-secondary"
                                  variant="body2"
                                >
                                  In progress
                                </Typography>
                              </Box>
                            </Stack>
                            <RadioButtonIcon
                              isSelected={
                                selectedPropertyValue ===
                                Number(listingProperty.id)
                              }
                            />
                          </Stack>
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  classes={{
                    icon: "w-5 right-3",
                    select: "pl-4 pr-8 py-1.5 max-w-72",
                  }}
                  IconComponent={KeyboardArrowDownIcon}
                  id="demo-simple-select"
                  input={
                    <OutlinedInput
                      classes={{
                        notchedOutline: "rounded-pill",
                      }}
                    />
                  }
                  labelId="demo-simple-select-label"
                  MenuProps={{
                    anchorOrigin: {
                      horizontal: "right",
                      vertical: "bottom",
                    },
                    classes: {
                      list: "max-h-[21.875rem] overflow-auto w-44",
                      paper: "rounded-xl mt-2",
                    },
                    transformOrigin: {
                      horizontal: "right",
                      vertical: "top",
                    },
                  }}
                  renderValue={(value) => {
                    const selected = CALENDAR_VIEW_OPTIONS.find(
                      (option) => option.value === value,
                    );
                    return (
                      <Stack className="flex-row items-center gap-3">
                        <Typography className="truncate" variant="body2">
                          {selected?.label}
                        </Typography>
                        <Divider
                          flexItem
                          className="mr-0.5 h-3"
                          orientation="vertical"
                          variant="middle"
                        />
                      </Stack>
                    );
                  }}
                  value={selectedCalenderViewOptionValue}
                  onChange={handleShowOptionChange}
                >
                  {CALENDAR_VIEW_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      className="px-6 py-4"
                      value={option.value}
                    >
                      <Stack className="w-full flex-row items-center">
                        <Stack className="w-full flex-row items-center justify-between gap-2">
                          <Typography
                            className="line-clamp-2 text-wrap font-medium"
                            variant="body2"
                          >
                            {option.label}
                          </Typography>

                          {selectedCalenderViewOptionValue === option.value ? (
                            <RadioButtonCheckedIcon color="primary" />
                          ) : (
                            <RadioButtonUncheckedIcon color="action" />
                          )}
                        </Stack>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  disableRipple
                  className="rounded-pill py-[0.3125rem] hover:bg-common-transparent lg:hidden"
                  variant="outlined"
                  onClick={toggleCalenderSettings}
                >
                  <Stack className="flex-row items-center gap-1">
                    <Typography className="truncate pr-1" variant="body2">
                      Settings
                    </Typography>
                    <Divider
                      flexItem
                      className="mr-0.5 h-3"
                      orientation="vertical"
                      variant="middle"
                    />
                    <SettingsOutlinedIcon className="size-5" />
                  </Stack>
                </Button>
              </Box>
            </Stack>
            <Box>
              <HostCalendar
                blockedDates={blockedDates}
                getPriceForDate={getPriceForDate}
                isPropertyPricingInfoApiIsLoading={
                  isPropertyPricingInfoApiIsLoading
                }
                selectedCells={selectedCells}
                setSelectedCells={setSelectedCells}
              />
            </Box>
          </Box>
          <Divider
            flexItem
            className="hidden lg:block"
            orientation="vertical"
          />
          <Box
            className={`no-scrollbar fixed top-0 z-10 ${calenderSettings ? "" : "hidden"} size-full shrink-0 overflow-auto bg-common-white px-6 py-12 lg:static lg:block lg:w-[23.125rem] lg:py-8`}
          >
            <IconButton
              className="absolute left-2 top-2 size-8 lg:hidden"
              onClick={toggleCalenderSettings}
            >
              <CloseIcon className="size-5" />
            </IconButton>
            {children}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

"use client";

import React, { ReactNode, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { SelectChangeEvent } from "@mui/material";

import { Avatar } from "@/components/atoms/Avatar";
import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Divider } from "@/components/atoms/Divider";
import { MenuItem } from "@/components/atoms/MenuItem";
import { OutlinedInput } from "@/components/atoms/OutlinedInput";
import { Select } from "@/components/atoms/Select/Select";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import CalendarApp, {
  Calendar,
} from "./components/CalendarSettings/Calendar/Calendar";
import { CalendarRefType } from "./Multicalendar.types";

const propertyOptions = [
  { img: "https://via.placeholder.com/24", label: "Option 1", value: 10 },
  {
    img: "https://via.placeholder.com/24",
    label:
      "Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2",
    value: 20,
  },
  { img: "https://via.placeholder.com/24", label: "Option 3", value: 30 },
  { img: "https://via.placeholder.com/24", label: "Option 1", value: 40 },
  {
    img: "https://via.placeholder.com/24",
    label:
      "Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2Option 2",
    value: 50,
  },
  { img: "https://via.placeholder.com/24", label: "Option 3", value: 60 },
];

const showOptions = [
  { label: "Month", value: 1 },
  { label: "Year", value: 2 },
];

export function Multicalendar({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [selectedPropertyValue, setSelectedPropertyValue] =
    React.useState<number>(10);
  const [selectedShowOptionValue, setSelectedShowOptionValue] =
    React.useState<number>(1);

  const handlePropertyChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPropertyValue(event.target.value as number);
  };

  const calendarRef = useRef<CalendarRefType>(null);

  const handleShowOptionChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedShowOptionValue(event.target.value as number);
    if (calendarRef?.current) {
      if (event.target.value === 1) {
        calendarRef.current.getApi().changeView("multiMonth");
      } else {
        calendarRef.current.getApi().changeView("multiMonthYear");
      }
    }
  };

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
    <Container maxWidth="2xl">
      <Stack className="h-[calc(100vh-6.375rem)]">
        <Stack className="h-full flex-row items-start gap-6">
          <Box className="no-scrollbar size-full grow overflow-auto">
            <Stack className=" sticky top-0 z-[3] flex-row items-center justify-between bg-common-white py-6">
              <Box>
                <Typography className="text-[1.625rem] leading-8" variant="h2">
                  November 2023
                </Typography>
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
                    const selected = propertyOptions.find(
                      (option) => option.value === value,
                    );
                    return (
                      <Stack className="flex-row items-center gap-3">
                        <Avatar className="size-7" src={selected?.img} />
                        <Typography className="truncate" variant="body2">
                          {selected?.label}
                        </Typography>
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
                  {propertyOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      className="px-6 py-4"
                      value={option.value}
                    >
                      <Stack className="w-full flex-row items-center">
                        <Stack className="w-full flex-row items-center justify-between gap-2">
                          <Stack className="flex-row items-center gap-2">
                            <Box className="size-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                alt="Cover image"
                                height={60}
                                src="/images/aa.jpg"
                                width={60}
                              />
                            </Box>
                            <Box>
                              <Typography
                                className="line-clamp-2 text-wrap font-medium"
                                variant="body2"
                              >
                                {option.label}
                              </Typography>
                              <Typography
                                className="text-xs text-text-secondary"
                                variant="body2"
                              >
                                In progress
                              </Typography>
                            </Box>
                          </Stack>
                          {selectedPropertyValue === option.value ? (
                            <RadioButtonCheckedIcon color="primary" />
                          ) : (
                            <RadioButtonUncheckedIcon color="action" />
                          )}
                        </Stack>
                      </Stack>
                    </MenuItem>
                  ))}
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
                    const selected = showOptions.find(
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
                  value={selectedShowOptionValue}
                  onChange={handleShowOptionChange}
                >
                  {showOptions.map((option) => (
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

                          {selectedShowOptionValue === option.value ? (
                            <RadioButtonCheckedIcon color="primary" />
                          ) : (
                            <RadioButtonUncheckedIcon color="action" />
                          )}
                        </Stack>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
            <Box>
              <CalendarApp />
            </Box>
          </Box>
          <Divider flexItem orientation="vertical" />
          <Box className="no-scrollbar h-full w-80 shrink-0 overflow-auto py-8">
            {children}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

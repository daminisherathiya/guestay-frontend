import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { DEFAULT_TIMEZONE } from "@/consts/common";

import {
  getDefaultPropertyTitleType,
  getListingStatusToDisplayType,
} from "./common.types";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUserInitial = (name: string) => name.charAt(0).toUpperCase();

export function removeLeadingZeros(value: string) {
  const removeLeadingZeros = value.replace(/^0+/, "");
  return removeLeadingZeros === "" ? "0" : removeLeadingZeros;
}

export const roundNumber = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(2);
};

export const numericValue = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers === "" ? "0" : onlyNumbers;
};

export const formatNumberWithCommas = (num: string) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getListingStatusToDisplay = ({
  listingSteps,
  status,
}: getListingStatusToDisplayType) => {
  if (status !== "draft") {
    return status;
  }
  if (listingSteps.includes("draft")) {
    return "Pending approval";
  }
  return "In progress";
};

export const getDefaultPropertyTitle = ({
  createdAt,
}: getDefaultPropertyTitleType) => {
  return `Your listing started at ${dayjs.tz(createdAt, DEFAULT_TIMEZONE).local().format("D MMMM YYYY")}`;
};

import { UserDataType } from "@/types/User.types";

import {
  AUTHENTICATION_TOKEN_STRING,
  SELECTED_LISTINGS_VIEW,
  USER_DETAILS_STRING,
} from "./localStorage.consts";
import {
  setAuthenticationTokenType,
  setSelectedListingsViewType,
  setUserDetailsType,
} from "./localStorage.types";

export const hasAuthenticationToken = () => {
  return !!localStorage.getItem(AUTHENTICATION_TOKEN_STRING);
};

export const setAuthenticationToken = ({
  authenticationToken,
}: setAuthenticationTokenType) => {
  return localStorage.setItem(AUTHENTICATION_TOKEN_STRING, authenticationToken);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem(AUTHENTICATION_TOKEN_STRING);
};

export const removeAuthenticationToken = () => {
  localStorage.removeItem(AUTHENTICATION_TOKEN_STRING);
};

export const setUserDetails = ({ userDetails }: setUserDetailsType) => {
  return localStorage.setItem(USER_DETAILS_STRING, JSON.stringify(userDetails));
};

export const getUserDetails = (): UserDataType => {
  const userDetailsString = localStorage.getItem(USER_DETAILS_STRING);
  const userDetails = JSON.parse(userDetailsString as string);
  return userDetails;
};

export const removeUserDetails = () => {
  localStorage.removeItem(USER_DETAILS_STRING);
};

export const setSelectedListingsView = ({
  selectedListingsView,
}: setSelectedListingsViewType) => {
  return localStorage.setItem(SELECTED_LISTINGS_VIEW, selectedListingsView);
};

export const getSelectedListingsView = () => {
  return localStorage.getItem(SELECTED_LISTINGS_VIEW);
};

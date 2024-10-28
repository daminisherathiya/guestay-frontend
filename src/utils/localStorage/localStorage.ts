import { UserDataType } from "@/types/User.types";

import {
  AUTHENTICATION_TOKEN_STRING,
  PROPERTY_ID_TO_EDIT_STRING,
  USER_DETAILS_STRING,
} from "./localStorage.const";
import {
  setAuthenticationTokenType,
  setPropertyIdToEditType,
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

export const setPropertyIdToEdit = ({
  propertyIdToEdit,
}: setPropertyIdToEditType) => {
  return localStorage.setItem(PROPERTY_ID_TO_EDIT_STRING, propertyIdToEdit);
};

export const getPropertyIdToEdit = () => {
  return localStorage.getItem(PROPERTY_ID_TO_EDIT_STRING);
};

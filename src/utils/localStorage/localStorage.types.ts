import { UserDataType } from "@/types/User.types";

export interface setAuthenticationTokenType {
  authenticationToken: string;
}

export interface setUserDetailsType {
  userDetails: UserDataType;
}

export interface setSelectedListingsViewType {
  selectedListingsView: "List" | "Grid";
}

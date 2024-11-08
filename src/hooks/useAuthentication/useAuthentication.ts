import { useContext } from "react";

import { AuthenticationContext } from "@/providers/AuthenticationProvider/AuthenticationProvider";

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider",
    );
  }

  return context;
};

import { useContext } from "react";

import { MulticalendarContext } from "@/providers/MulticalendarProvider/MulticalendarProvider";

export function useMulticalendarContext() {
  const context = useContext(MulticalendarContext);
  if (context === undefined) {
    throw new Error(
      "useMulticalendarContext must be used within a MulticalendarProvider",
    );
  }
  return context;
}

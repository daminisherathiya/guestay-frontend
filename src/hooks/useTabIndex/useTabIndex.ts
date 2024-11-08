"use client";

import { useState } from "react";

import { useTabIndexProps } from "./useTabIndex.types";

export function useTabIndex({ initialIndex = 0 }: useTabIndexProps) {
  const [index, setIndex] = useState<number>(initialIndex);

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
  };

  return [index, handleChange] as const;
}

"use client";

import { SyntheticEvent, useState } from "react";

import { useTabIndexProps } from "./useTabIndex.types";

export function useTabIndex({ initialIndex = 0 }: useTabIndexProps) {
  const [index, setIndex] = useState<number>(initialIndex);

  const handleChange = (_: SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
  };

  return [index, handleChange] as const;
}

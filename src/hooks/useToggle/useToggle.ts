import { useCallback, useState } from "react";

import { useToggleProps } from "./useToggle.types";

export function useToggle({ initialValue = false }: useToggleProps) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return { toggle, value };
}

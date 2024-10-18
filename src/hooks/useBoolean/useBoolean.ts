import { useCallback, useState } from "react";

interface useBooleanProps {
  initialValue: boolean;
}

function useBoolean({ initialValue = false }: useBooleanProps) {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { setFalse, setTrue, toggle, value };
}

export default useBoolean;

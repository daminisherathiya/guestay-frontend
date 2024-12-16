import { useCallback, useEffect, useState } from "react";

import { useSelectWithApplyAndResetProps } from "./SelectWithApplyAndReset.types";

export function useSelectWithApplyAndReset({
  onCloseSelectHandler,
  onSaveSelectHandler,
}: useSelectWithApplyAndResetProps) {
  const [totalGuests, setTotalGuests] = useState<number>(onSaveSelectHandler());
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!selectOpen) {
      onCloseSelectHandler();
    }
  }, [selectOpen, onCloseSelectHandler]);

  const handleSave = useCallback(() => {
    setTotalGuests(onSaveSelectHandler());
    setSelectOpen(false);
  }, [onSaveSelectHandler]);

  return { handleSave, selectOpen, setSelectOpen, totalGuests };
}

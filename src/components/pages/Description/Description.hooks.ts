import { useState } from "react";

export function useDescription() {
  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 500) {
      setTitle(newValue);
    } else {
      setTitle(newValue.slice(0, 500));
    }
  };
  return { handleTitleChange, title };
}

import { useState } from "react";

export function useTitle() {
  const [title, setTitle] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 32) {
      setTitle(newValue);
    } else {
      setTitle(newValue.slice(0, 32));
    }
  };
  return { handleTitleChange, title };
}

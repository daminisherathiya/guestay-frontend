import React, { ReactElement } from "react";

import Button from "@mui/material/Button";

interface InputFileUploadProps {
  children: ReactElement;
  className?: string;
  size?: "small" | "large" | "medium";
}

export default function InputFileUpload({
  children,
  className,
  size = "large",
}: InputFileUploadProps) {
  return (
    <Button
      className={className}
      color="secondary"
      component="label"
      role={undefined}
      size={size}
      tabIndex={-1}
      variant="contained"
    >
      {children}
      <input
        multiple
        accept=".png,.jpg,.jpeg,.svg,.webp"
        className="absolute bottom-0 left-0 size-px overflow-hidden whitespace-nowrap"
        type="file"
        onChange={(event) => console.log(event.target.files)}
      />
    </Button>
  );
}

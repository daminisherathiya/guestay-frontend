import { Button } from "@/components/atoms/Button";

import { SocialButtonProps } from "./SocialButton.types";

export function SocialButton({ className, icon, label }: SocialButtonProps) {
  return (
    <Button
      className={`w-full justify-between border-common-black/45 text-sm ${className}`}
      size="large"
      variant="outlined"
    >
      {icon}
      {label}
      <div></div> {/* Placeholder for maintaining button structure */}
    </Button>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";

export function useStaticFooter() {
  const router = useRouter();

  const onSubmit = () => {
    router.push(nextUrl);
  };

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: false,
    isLoading: false,
    onSubmit: onSubmit,
  });

  return { Footer };
}

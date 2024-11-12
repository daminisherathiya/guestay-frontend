import type { Metadata } from "next";

import { Signup } from "@/components/pages/Signup";

export const metadata: Metadata = {
  title: "Sign Up - Guestay",
};

export default function SignupPage() {
  return <Signup />;
}

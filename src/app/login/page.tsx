import type { Metadata } from "next";

import { Login } from "@/components/pages/Login";

export const metadata: Metadata = {
  title: "Log In - Guestay",
};

export default function LogInPage() {
  return <Login />;
}

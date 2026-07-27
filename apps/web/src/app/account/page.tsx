import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "My Account — Earn Points",
  description: "Join RichDeals free, earn points for signing up, checking in daily and opening deals.",
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Account", href: "/account" }]} />
      <AccountClient />
    </div>
  );
}

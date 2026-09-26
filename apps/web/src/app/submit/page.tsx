import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, absUrl } from "@/lib/site";
import SubmitClient from "./SubmitClient";

export const metadata: Metadata = {
  title: "Post a Deal — Earn ₹1 per Published Deal",
  description:
    "Found a genuine price drop? Post the product link on RichDeals. We verify the price, publish the deal with your name on it and credit ₹1 to your account.",
  alternates: { canonical: `${SITE_URL}/submit` },
  openGraph: { title: "Post a Deal — Earn ₹1 per Published Deal", url: absUrl("/submit"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
};

export default function SubmitPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Post a deal", href: "/submit" }]} />
      <SubmitClient />
    </div>
  );
}

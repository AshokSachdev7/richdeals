import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStores } from "@/lib/api";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";
import { storeLogo } from "@/lib/storeLogos";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All Stores — Coupons & Deals",
  description: `Browse deals and coupon codes by store — Amazon, Flipkart, Myntra and more, all in one place on ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/stores") },
};

export default async function StoresPage() {
  const stores = await getStores();

  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Stores", href: "/stores" }]} />
      <h1 className="mb-1 text-2xl font-extrabold">All Stores</h1>
      <p className="mb-5 text-sm text-gray-500">
        Pick a store to see its latest deals and coupon codes.
      </p>

      {stores.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No stores available yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stores.map((s) => (
            <Link
              key={s.id}
              href={`/stores/${s.slug}`}
              className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center transition hover:shadow-md"
            >
              <div className="relative h-12 w-full">
                {storeLogo(s.slug) ?? s.logo ? (
                  <Image src={(storeLogo(s.slug) ?? s.logo)!} alt={s.name} fill className="object-contain p-1" sizes="120px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-lg font-bold text-gray-400">
                    {s.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">{s.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

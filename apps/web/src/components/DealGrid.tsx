import type { DealDTO } from "@deals/shared";
import DealCard from "./DealCard";

export default function DealGrid({
  deals,
  emptyMessage = "No deals found right now. Check back soon!",
}: {
  deals: DealDTO[];
  emptyMessage?: string;
}) {
  if (!deals.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

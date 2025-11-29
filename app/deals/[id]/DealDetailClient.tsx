'use client';

import type { Deal } from '@/types';

type DealDetailClientProps = {
  deal: Deal;
};

export default function DealDetailClient({ deal }: DealDetailClientProps) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{deal.projectName}</h1>
      <p className="text-sm text-gray-400">
        {deal.country} · {deal.region} · {deal.crop}
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <h2 className="font-semibold">Ticket size</h2>
          <p>
            {deal.ticketSize} {deal.currency}
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Risk score</h2>
          <p>{deal.riskScore}</p>
        </div>
        <div>
          <h2 className="font-semibold">Risk level</h2>
          <p>{deal.riskLevel}</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Description</h2>
        <p>{deal.description}</p>
      </div>
    </div>
  );
}

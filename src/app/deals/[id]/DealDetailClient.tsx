'use client';

import type { Deal } from '@/types';

type DealDetailClientProps = {
  deal: Deal;
};

export default function DealDetailClient({ deal }: DealDetailClientProps) {
  // IMPORTANT: must return JSX
  return (
    <div>
      <h1>{deal.projectName}</h1>
      <p>{deal.country}</p>
      {/* add whatever fields you want to show */}
    </div>
  );
}

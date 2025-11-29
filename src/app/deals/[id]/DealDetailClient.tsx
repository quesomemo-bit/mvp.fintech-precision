import { notFound } from 'next/navigation';
import DealDetailClient from './DealDetailClient';
import { mockDeals } from '@/data/mockDeals';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = mockDeals.find(d => d.id === params.id);
  
  if (!deal) {
    notFound();
  }

  return <DealDetailClient deal={deal} />;
}

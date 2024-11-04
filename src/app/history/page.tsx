import { History } from '@/features/history';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <History />
    </Suspense>
  );
}

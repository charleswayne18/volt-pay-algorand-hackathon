'use client';

import { ConfirmPurchaseModal } from '@/components/confirm-purchase-modal';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';
import { useRecoilValue } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export const ConfirmPurchaseProvider = ({ children }: Props) => {
  const confirmPurchase = useRecoilValue(ConfirmPurchaseAtom);

  return (
    <>
      {confirmPurchase && <ConfirmPurchaseModal />}
      {children}
    </>
  );
};

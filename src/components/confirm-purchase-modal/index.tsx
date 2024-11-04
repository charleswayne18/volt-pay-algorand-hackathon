'use client';

import styles from './index.module.scss';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';
import { useRecoilState } from 'recoil';
import { BackgroundOverlay } from '../background-overlay';
import { commaFormat } from '@/utils/comma-format';
import { Button } from '../buttons';
import { NGN_TO_ALGO } from '@/constants/ngn-to-algo.constant';
import { useContractActions } from '@/actions/contract';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNotification } from '@/hooks/use-notification';

export const ConfirmPurchaseModal = () => {
  const [confirmPurchase, setConfirmPurchase] = useRecoilState(ConfirmPurchaseAtom);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const { makeVtuPayment } = useContractActions();

  const ngnToAlgo = (amount: number) => amount * NGN_TO_ALGO;

  const priceAlgo = ngnToAlgo(confirmPurchase?.priceNGN || 0);

  const handleClick = async () => {
    if (!confirmPurchase) {
      notify({
        type: 'error',
        title: 'Error',
        message: 'You have not provided all necessary parameters for this transaction',
      });
      return;
    }

    const { receiver, type, operator, value } = confirmPurchase;
    setLoading(true);
    const id = toast.loading('Processing payment... Please wait');

    const res = await makeVtuPayment({
      algoAmount: priceAlgo,
      phone: receiver,
      operator,
      type: type as any,
      value,
    });

    setLoading(false);
    toast.dismiss(id);

    if (res) {
      notify({
        type: 'success',
        title: 'Success',
        message: `Payment successful. You will receive the ${type} shortly`,
        duration: 6000,
      });
      setConfirmPurchase(null);
    }
  };

  return (
    <BackgroundOverlay
      onClose={() => {
        if (loading) return;
        setConfirmPurchase(null);
      }}
    >
      <div className={styles.container}>
        <h4 className={styles.title}>Confirm Purchase</h4>

        <div className={styles.content}>
          <img src={confirmPurchase?.image} alt="Service" />

          <div className={styles.details}>
            <h4>₦{commaFormat(confirmPurchase?.priceNGN || 0)}</h4>

            {confirmPurchase?.serviceMetadata && <p>{confirmPurchase.serviceMetadata}</p>}

            <p>{confirmPurchase?.receiver}</p>
          </div>

          <p className={styles.service}>{confirmPurchase?.serviceType}</p>
        </div>

        <div className={styles.buttons}>
          <Button
            label="Cancel"
            onClick={() => setConfirmPurchase(null)}
            variant="text"
            disabled={loading}
          />
          <Button
            label={`Confirm Payment (${priceAlgo} ALGO)`}
            onClick={handleClick}
            variant="solid"
            colorScheme="orange"
            disabled={loading}
          />
        </div>
      </div>
    </BackgroundOverlay>
  );
};

'use client';

import { useWallet } from '@txnlab/use-wallet';
import { BackgroundOverlay } from '../background-overlay';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { useNotification } from '@/hooks/use-notification';

interface Props {
  onClose: () => void;
}

export const WalletConnectModal = ({ onClose }: Props) => {
  const { providers: wallets, activeAddress } = useWallet();
  const { notify } = useNotification();

  useEffect(() => {
    if (activeAddress) {
      onClose();
      notify({
        type: 'success',
        message: 'Wallet connected successfully',
      });
    }
  }, [activeAddress]);

  return (
    <BackgroundOverlay onClose={onClose}>
      <div className={styles.container}>
        <h4 className={styles.title}>Connect Wallet</h4>

        <p className={styles.description}>Select your preferred method </p>
        <div className={styles.wallets}>
          {wallets?.map((wallet) => (
            <div className={styles.wallet} key={wallet.metadata.id} onClick={wallet.connect}>
              <img src={wallet.metadata.icon} alt={`${wallet.metadata.name} icon`} />
              <span>{wallet.metadata.name}</span>
            </div>
          ))}
        </div>
      </div>
    </BackgroundOverlay>
  );
};

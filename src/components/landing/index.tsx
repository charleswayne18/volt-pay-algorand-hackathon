'use client';
import { useSetRecoilState } from 'recoil';
import styles from './index.module.scss';
import { ConnectWalletVisibleAtom, Screen, ScreenAtom } from '@/state';
import { useWallet } from '@txnlab/use-wallet';
import classNames from 'classnames';
import { AirtimeIcon, BillIcon, DataIcon } from '@/assets';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export const Landing = () => {
  const setConnectWallet = useSetRecoilState(ConnectWalletVisibleAtom);
  const setScreen = useSetRecoilState(ScreenAtom);
  const { activeAddress } = useWallet();

  const goToScreen = (screen: Screen) => {
    if (!activeAddress) {
      setConnectWallet(true);
      return;
    }

    setScreen(screen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.text_section}>
        <h4>Pay Your Bills the Easy Way, with ALGO or USDC</h4>
        <p>
          Connect your wallet, choose your bill, and make payments in seconds. Whether it's
          electricity, water or internet
        </p>

        {!activeAddress && <button onClick={() => setConnectWallet(true)}>Connect Wallet</button>}

        <div className={styles.overlay_one} />
        <div className={styles.overlay_two} />
      </div>

      <div className={styles.interact}>
        <div
          className={classNames(styles.interact_card, styles.airtime)}
          onClick={() => goToScreen('airtime')}
        >
          <div className={styles.icon}>
            <AirtimeIcon />
          </div>

          <div className={styles.text}>
            <h4>Buy airtime</h4>
            <HiOutlineArrowNarrowRight />
          </div>
        </div>

        <div
          className={classNames(styles.interact_card, styles.data)}
          onClick={() => goToScreen('data')}
        >
          <div className={styles.icon}>
            <DataIcon />
          </div>

          <div className={styles.text}>
            <h4>Buy data</h4>
            <HiOutlineArrowNarrowRight />
          </div>
        </div>

        <div
          className={classNames(styles.interact_card, styles.bill)}
          // onClick={() => goToScreen('bill')}
        >
          <div className={styles.icon}>
            <BillIcon />
          </div>

          <div className={styles.text}>
            <h4>Pay bill</h4>
            <HiOutlineArrowNarrowRight />
          </div>

          <div className={styles.coming_soon}>Coming Soon</div>
        </div>
      </div>
    </div>
  );
};

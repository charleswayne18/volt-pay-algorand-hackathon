'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { PiUserCircle } from 'react-icons/pi';
import { ConnectWalletVisibleAtom, ScreenAtom } from '@/state';
import { useSetRecoilState } from 'recoil';
import { useWallet } from '@txnlab/use-wallet';
import { PermissionModal } from '../permission-modal';
import { useNotification } from '@/hooks/use-notification';
import { usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';

export const TopNav = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const setConnectWallet = useSetRecoilState(ConnectWalletVisibleAtom);
  const setScreen = useSetRecoilState(ScreenAtom);
  const { activeAddress, providers } = useWallet();
  const { notify } = useNotification();
  const { push } = useRouter();
  const pathname = usePathname();

  const parsedAddress = activeAddress
    ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`
    : '';
  const dropDownRef = useRef<HTMLDivElement>(null);

  const disconnectWallet = () => {
    for (const provider of providers || []) {
      try {
        provider.disconnect();
      } catch (e) {
        console.error(e);
      }
    }

    setScreen('home');
    setShowDisconnectModal(false);
    notify({
      type: 'success',
      message: 'Wallet disconnected successfully',
    });
    push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToHome = () => {
    if (pathname === '/') {
      setScreen('home');
      return;
    }

    push('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img
          src="https://res.cloudinary.com/dggbmtpgx/image/upload/v1729632430/Top_y3jqhf.png"
          alt="logo"
        />
        <h4>VoltPay</h4>
      </div>

      <div className={styles.nav}>
        <p onClick={goToHome} className={classNames({ [styles.active]: pathname === '/' })}>
          Home
        </p>

        <p
          onClick={() => push('/history')}
          className={classNames({ [styles.active]: pathname === '/history' })}
        >
          History
        </p>
      </div>

      {!!activeAddress ? (
        <div onClick={() => setShowDropDown(true)} className={styles.user_card}>
          <PiUserCircle /> <p>{parsedAddress}</p>
          {showDropDown && (
            <div className={styles.drop_down} ref={dropDownRef}>
              <div onClick={() => push('/history')}>View history</div>
              <div
                onClick={() => {
                  setTimeout(() => {
                    setShowDropDown(false);
                  }, 0);
                  setShowDisconnectModal(true);
                }}
                style={{ color: '#D42620' }}
              >
                Remove wallet
              </div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setConnectWallet(true)} className={styles.connect_btn}>
          Connect Wallet
        </button>
      )}

      <PermissionModal
        visible={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        onNo={() => setShowDisconnectModal(false)}
        onYes={disconnectWallet}
        yesBtnText="Disconnect"
        noBtnText="Cancel"
        title="Disconnect Wallet"
        content={
          <>
            Are you sure you want to disconnect your wallet? <br /> You will no longer be able to
            interact with your account or make any transactions until you reconnect your wallet
          </>
        }
      />
    </div>
  );
};

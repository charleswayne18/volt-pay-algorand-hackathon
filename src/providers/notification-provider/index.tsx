'use client';

import { Notifications } from '@/components/notification';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../socket';
import { IHistory } from '@/interface/history.interface';
import { useWallet } from '@txnlab/use-wallet';
import { Socket } from 'socket.io-client';
import { useNotification } from '@/hooks/use-notification';
import { commaFormat } from '@/utils/comma-format';

interface Props {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const socket = useContext(SocketContext);
  const { activeAddress } = useWallet();
  const { notify } = useNotification();

  const listenForEvents = (address: string, socketInstance: Socket) => {
    if (socketInstance.hasListeners(address)) {
      return;
    }

    socketInstance.on(address, handlePayload);

    socketInstance.on('connect', () => {
      // console.log('Connected to socket instance');
    });
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [socket?.connected]);

  const handlePayload = (payload: IHistory) => {
    console.log(payload);

    let message = '';

    if (payload.package) {
      message = `${payload.package} for ${payload.recipient} was successfully purchased. Click to view details`;
    } else {
      message = `Airtime of ₦${commaFormat(payload.amount)} was successfully purchased for ${
        payload.recipient
      }. Click to view details`;
    }

    notify({
      type: 'success',
      message,
      duration: 12000,
      title: 'Transaction successful',
      routeTo: payload.package ? '/history?type=data' : '/history?type=airtime',
    });
  };

  useEffect(() => {
    if (activeAddress) {
      listenForEvents(activeAddress, socket);
    }
  }, [socket?.connected, activeAddress]);

  return (
    <>
      <Notifications />
      {children}
    </>
  );
};

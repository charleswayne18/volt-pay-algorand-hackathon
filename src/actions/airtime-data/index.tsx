'use client';

import { useClient } from '@/hooks/use-client';
import { useNotification } from '@/hooks/use-notification';
import { IDataPackageResponse, IOperator } from '@/interface/data.interface';
import { IHistory } from '@/interface/history.interface';
import { useWallet } from '@txnlab/use-wallet';
import { act, useCallback } from 'react';

export const useAirtimeDataActions = () => {
  const client = useClient();
  const { notify } = useNotification();

  const getAllDataPackages = async () => {
    const url = '/volt-pay/data-packages';

    const response = await client.get<IDataPackageResponse[]>(url);

    if (response.data) {
      return response.data;
    } else {
      notify({ type: 'error', title: 'Error', message: String(response.error?.toString()) });
    }
  };

  const getAllNetworkOperators = async () => {
    const url = '/volt-pay/network-operators';

    const response = await client.get<IOperator[]>(url);

    if (response.data) {
      return response.data;
    } else {
      notify({ type: 'error', title: 'Error', message: String(response.error?.toString()) });
    }
  };

  const getTransactionHistory = useCallback(async (type: 'airtime' | 'data', address: string) => {
    const url = `/volt-pay/transactions/${address}/${type}`;

    const response = await client.get<IHistory[]>(url);

    if (response.data) {
      return response.data;
    } else {
      notify({ type: 'error', title: 'Error', message: String(response.error?.toString()) });
    }
  }, []);

  return {
    getAllDataPackages,
    getAllNetworkOperators,
    getTransactionHistory,
  };
};

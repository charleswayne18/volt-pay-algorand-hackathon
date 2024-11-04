import { VoltPayClient } from '@/contract/VoltPayClient';
import { getAlgodClient } from '@/utils/get-algo-client-config';
import { useWallet } from '@txnlab/use-wallet';
import env from '@/config';
import { useCallback } from 'react';
import { useNotification } from '@/hooks/use-notification';
import algosdk from 'algosdk';
import * as algokit from '@algorandfoundation/algokit-utils';

export const useContractActions = () => {
  const { activeAddress, signer } = useWallet();
  const algodClient = getAlgodClient();
  const { notify } = useNotification();

  const makeVtuPayment = useCallback(
    async ({
      phone,
      operator,
      type,
      value,
      algoAmount,
    }: {
      phone: string;
      operator: string;
      type: 'data' | 'airtime';
      value: string;
      algoAmount: number;
    }) => {
      if (!activeAddress || !signer) {
        notify({ type: 'error', title: 'Error', message: 'No wallet connected' });
        return;
      }

      const sender = { signer, addr: activeAddress };

      const contractClient = new VoltPayClient(
        {
          resolveBy: 'id',
          id: Number(env.VTU_CONTRACT_ID),
          sender,
        },
        algodClient,
      );

      const suggestedParams = await algodClient.getTransactionParams().do();
      const { appAddress } = await contractClient.appClient.getAppReference();
      const appInfo = await algokit.getAppById(Number(env.VTU_CONTRACT_ID), algodClient);
      const creator = appInfo.params.creator;

      try {
        const accountInfo = await algodClient.accountInformation(sender.addr).do();

        const isOptedIn = accountInfo['apps-local-state'].some(
          (app: any) => app.id === Number(env.VTU_CONTRACT_ID),
        );
        if (isOptedIn) {
          console.log('Already opted in');
        } else {
          await contractClient.optIn.optInToApplication({}, { sender });
        }
      } catch (error) {
        console.log('Opt in error', error);
        return false;
      }

      const encoder = new TextEncoder();

      const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender.addr,
        to: appAddress,
        amount: algokit.algos(algoAmount).microAlgos,
        suggestedParams,
      });

      try {
        await contractClient.makeVtuPayment(
          {
            paymentTxn: {
              transaction: payTxn,
              signer: sender,
            },
            phone,
            operator,
            type,
            value,
          },
          {
            sender,
            sendParams: {
              fee: algokit.microAlgos(2_000),
            },
            accounts: [creator],
            note: encoder.encode(env.VTU_TX_NOTE_PREFIX || ''),
          },
        );

        return true;
      } catch (error: any) {
        notify({ type: 'error', title: 'Error', message: error.message });
        console.log('Error', error);

        return false;
      }
    },
    [activeAddress, signer],
  );

  return { makeVtuPayment };
};

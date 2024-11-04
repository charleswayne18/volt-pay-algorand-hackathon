'use client';
import { useSetRecoilState } from 'recoil';
import { BackButton } from '../back-button';
import styles from './index.module.scss';
import { ScreenAtom } from '@/state';
import { PhoneInput } from '../inputs/phone-input';
import { useEffect, useState } from 'react';
import { DefaultInput } from '../inputs/default-input';
import { commaFormat } from '@/utils/comma-format';
import { Button } from '../buttons';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';
import { useAirtimeDataActions } from '@/actions/airtime-data';
import { GenericSelector } from '../inputs/generic-selector';
import { IOperator } from '@/interface/data.interface';

export const Airtime = () => {
  const setScreen = useSetRecoilState(ScreenAtom);
  const setConfirmPurchase = useSetRecoilState(ConfirmPurchaseAtom);
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<IOperator[]>([]);

  const { getAllNetworkOperators } = useAirtimeDataActions();

  const handleAmountChange = (val: string) => {
    const amt = val.replace(/\D/g, '');

    setAmount(amt);
  };

  const parsedValue = commaFormat(parseInt(amount || '0'));

  const onSubmit = () => {
    setConfirmPurchase({
      image: providers.find((provider) => provider.operator === network)?.operatorImage || '',
      priceNGN: parseInt(amount),
      receiver: phone,
      serviceType: 'Airtime top-up',
      operator: network,
      type: 'airtime',
      value: amount,
    });
  };

  const fetchProviders = async () => {
    setLoading(true);
    const res = await getAllNetworkOperators();
    setLoading(false);

    if (res) {
      setProviders(res);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className={styles.container}>
      <BackButton onClick={() => setScreen('home')} paths={['Home', 'Buy airtime']} />

      <div className={styles.form}>
        <GenericSelector
          onSelect={(network) => setNetwork(network)}
          options={providers.map((provider) => ({
            name: provider.operator,
            image: provider.operatorImage,
          }))}
          label="Mobile network provider"
          placeholder="Select network provider"
          loading={loading}
        />
        <PhoneInput value={phone} onChange={(val) => setPhone(val)} loading={loading} />
        <DefaultInput
          label="Airtime amount"
          value={parsedValue === '0' ? '' : parsedValue}
          onChange={handleAmountChange}
          loading={loading}
        />
        <div className={styles.buttons}>
          <Button label="Cancel" onClick={() => setScreen('home')} variant="text" />
          <Button
            label="Buy airtime"
            onClick={onSubmit}
            disabled={!phone || !network || !amount || loading}
            variant="solid"
            colorScheme="orange"
          />
        </div>
      </div>
    </div>
  );
};

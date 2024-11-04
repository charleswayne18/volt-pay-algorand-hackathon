'use client';
import { ScreenAtom } from '@/state';
import styles from './index.module.scss';
import { useSetRecoilState } from 'recoil';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';
import { useEffect, useState } from 'react';
import { commaFormat } from '@/utils/comma-format';
import { BackButton } from '../back-button';
import { PhoneInput } from '../inputs/phone-input';
import { DefaultInput } from '../inputs/default-input';
import { Button } from '../buttons';
import { IDataPackageResponse } from '@/interface/data.interface';
import { useAirtimeDataActions } from '@/actions/airtime-data';
import { GenericSelector } from '../inputs/generic-selector';

export const Data = () => {
  const setScreen = useSetRecoilState(ScreenAtom);
  const setConfirmPurchase = useSetRecoilState(ConfirmPurchaseAtom);
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [plan, setPlan] = useState('');
  const [packages, setPackages] = useState<IDataPackageResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const { getAllDataPackages } = useAirtimeDataActions();

  const handleAmountChange = (val: string) => {
    const amt = val.replace(/\D/g, '');

    setAmount(amt);
  };

  const parsedValue = commaFormat(parseInt(amount || '0'));

  const onSubmit = () => {
    setConfirmPurchase({
      image: packages.find((provider) => provider.operator === network)?.operatorImage || '',
      priceNGN: parseInt(amount),
      receiver: phone,
      serviceType: 'Data top-up',
      serviceMetadata: plan,
      operator: network,
      type: 'data',
      value:
        packages
          .find((provider) => provider.operator === network)
          ?.packages?.find((pkg) => pkg.description === plan)?.plan || '',
    });
  };

  const fetchPackages = async () => {
    setLoading(true);
    const res = await getAllDataPackages();
    setLoading(false);

    if (res) {
      setPackages(res);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className={styles.container}>
      <BackButton onClick={() => setScreen('home')} paths={['Home', 'Buy data']} />

      <div className={styles.form}>
        <GenericSelector
          onSelect={(network) => {
            setNetwork(network);
            setPlan('');
          }}
          options={packages.map((provider) => ({
            name: provider.operator,
            image: provider.operatorImage,
          }))}
          label="Mobile network provider"
          placeholder="Select network provider"
          loading={loading}
        />

        <GenericSelector
          label="Data package"
          placeholder="Select data package"
          options={
            packages
              .find((provider) => provider.operator === network)
              ?.packages.map((pkg) => ({ name: pkg.description })) || []
          }
          onSelect={(pkg) => {
            setPlan(pkg);
            const packagePrice =
              packages
                .find((provider) => provider.operator === network)
                ?.packages.find((p) => p.description === pkg)?.price || 0;

            handleAmountChange(packagePrice.toString());
          }}
          loading={loading}
        />

        {/* <DataPackageSelector
          onSelect={(data) => {
            setPlan(data.package);
            handleAmountChange(data.price.toString());
          }}
        /> */}
        <PhoneInput value={phone} onChange={(val) => setPhone(val)} loading={loading} />
        <DefaultInput
          label="Amount"
          value={parsedValue === '0' ? '' : parsedValue}
          onChange={handleAmountChange}
          disabled={true}
          loading={loading}
        />
        <div className={styles.buttons}>
          <Button label="Cancel" onClick={() => console.log('Cancel')} variant="text" />
          <Button
            label="Buy data"
            onClick={onSubmit}
            disabled={!phone || !network || !amount || !plan || loading}
            variant="solid"
            colorScheme="orange"
          />
        </div>
      </div>
    </div>
  );
};

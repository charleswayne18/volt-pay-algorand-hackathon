'use client';

import { ELECTRICITY_PROVIDERS } from '@/constants/electricity.constant';
import { GenericSelector } from '../inputs/generic-selector';
import styles from './index.module.scss';
import classNames from 'classnames';
import { DefaultInput } from '../inputs/default-input';
import { useState } from 'react';
import { commaFormat } from '@/utils/comma-format';
import { Button } from '../buttons';
import { useSetRecoilState } from 'recoil';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';

interface Props {
  onGoBack: () => void;
}

export const Electricity = ({ onGoBack }: Props) => {
  const [provider, setProvider] = useState('');
  const [packageType, setPackageType] = useState('');
  const [meterNumber, setMeternumber] = useState('');
  const [amount, setAmount] = useState('');
  const setConfirmPurchase = useSetRecoilState(ConfirmPurchaseAtom);

  const handleAmountChange = (val: string) => {
    const amt = val.replace(/\D/g, '');

    setAmount(amt);
  };

  const parsedValue = commaFormat(parseInt(amount || '0'));

  const onSubmit = () => {
    setConfirmPurchase({
      image: ELECTRICITY_PROVIDERS.find((p) => p.name === provider)?.image || '',
      priceNGN: parseInt(amount),
      receiver: meterNumber,
      serviceType: 'Electricity',
      serviceMetadata: packageType,
      type: 'electricity',
      operator: provider,
      value: amount,
    });
  };

  return (
    <div className={classNames(styles.form, styles.electricity)}>
      <GenericSelector
        options={ELECTRICITY_PROVIDERS}
        placeholder="Select Provider"
        label="Service provider"
        onSelect={(e) => setProvider(e)}
      />

      <GenericSelector
        options={[{ name: 'Prepaid' }, { name: 'Postpaid' }]}
        placeholder=""
        label="Select package"
        onSelect={(e) => setPackageType(e)}
      />

      <DefaultInput
        label="Meter number"
        placeholder="Enter meter number"
        value={meterNumber}
        onChange={(e) => setMeternumber(e)}
      />

      <DefaultInput
        label="Purchase amount"
        value={parsedValue === '0' ? '' : parsedValue}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />

      <div className={styles.buttons}>
        <Button label="Cancel" onClick={onGoBack} variant="text" />
        <Button
          label="Pay bill"
          onClick={onSubmit}
          disabled={!provider || !packageType || !amount || !meterNumber}
          variant="solid"
          colorScheme="orange"
        />
      </div>
    </div>
  );
};

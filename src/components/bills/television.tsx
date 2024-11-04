'use client';

import { GenericSelector } from '../inputs/generic-selector';
import styles from './index.module.scss';
import classNames from 'classnames';
import { DefaultInput } from '../inputs/default-input';
import { useState } from 'react';
import { commaFormat } from '@/utils/comma-format';
import { Button } from '../buttons';
import { useSetRecoilState } from 'recoil';
import { ConfirmPurchaseAtom } from '@/state/purchase.atom';
import { TELEVISION_PACKAGES, TELEVISION_PROVIDERS } from '@/constants/television.contant';

interface Props {
  onGoBack: () => void;
}

export const Television = ({ onGoBack }: Props) => {
  const [provider, setProvider] = useState('');
  const [packageType, setPackageType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const setConfirmPurchase = useSetRecoilState(ConfirmPurchaseAtom);

  const handleAmountChange = (val: string) => {
    const amt = val.replace(/\D/g, '');

    setAmount(amt);
  };

  const parsedValue = commaFormat(parseInt(amount || '0'));

  const onSubmit = () => {
    setConfirmPurchase({
      image: TELEVISION_PROVIDERS.find((p) => p.name === provider)?.image || '',
      priceNGN: parseInt(amount),
      receiver: cardNumber,
      serviceType: 'Television',
      serviceMetadata: packageType,
      operator: provider,
      type: 'television',
      value: amount,
    });
  };

  const PARSED_TELEVISION_PACKAGES = TELEVISION_PACKAGES.map((pkg) => ({
    name: `${pkg.name} ₦${commaFormat(pkg.price)}`,
  }));

  const handlePackageChange = (val: string) => {
    const pkg = TELEVISION_PACKAGES.find((pkg) => val.split('₦')[0].trim() === pkg.name);

    handleAmountChange(pkg?.price.toString() || '');
    setPackageType(pkg?.name || '');
  };

  return (
    <div className={classNames(styles.form, styles.electricity)}>
      <GenericSelector
        options={TELEVISION_PROVIDERS}
        placeholder="Select Provider"
        label="Service provider"
        onSelect={(e) => setProvider(e)}
      />

      <GenericSelector
        options={PARSED_TELEVISION_PACKAGES}
        placeholder="Select package"
        label="Select package"
        onSelect={(e) => handlePackageChange(e)}
        selected={packageType}
      />

      <DefaultInput
        label="Smart card number"
        placeholder="Enter card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e)}
      />

      <DefaultInput
        label="Purchase amount"
        value={parsedValue === '0' ? '' : parsedValue}
        onChange={handleAmountChange}
        placeholder="Enter amount"
        disabled={true}
      />

      <div className={styles.buttons}>
        <Button label="Cancel" onClick={onGoBack} variant="text" />
        <Button
          label="Pay bill"
          onClick={onSubmit}
          disabled={!provider || !packageType || !amount || !cardNumber}
          variant="solid"
          colorScheme="orange"
        />
      </div>
    </div>
  );
};

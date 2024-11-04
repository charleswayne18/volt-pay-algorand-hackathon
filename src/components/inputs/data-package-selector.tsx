'use client';

import {
  DAILY_DATA_PACKAGES,
  MONTHLY_DATA_PACKAGES,
  WEEKLY_DATA_PACKAGES,
} from '@/constants/data-packages.constant';
import { IDataPackage } from '@/interface/data.interface';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';

interface Props {
  onSelect: (data: IDataPackage) => void;
  label?: string;
  selected?: IDataPackage;
  placeholder?: string;
}

const PACKAGE_AGGREGATE: IDataPackage[] = [
  ...DAILY_DATA_PACKAGES,
  ...WEEKLY_DATA_PACKAGES,
  ...MONTHLY_DATA_PACKAGES,
];

export const DataPackageSelector = ({
  onSelect,
  label = 'Data package',
  selected,
  placeholder = 'Select data package',
}: Props) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState(selected);
  const [tab, setTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const showPlaceHolder =
    PACKAGE_AGGREGATE.find((pkg) => pkg.package === selectedPackage?.package) === undefined;

  // close dropdown when clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.form_group}>
      <label>{label}</label>
      <div
        className={classNames(styles.input, styles.network_selector)}
        onClick={() => setDropDown((x) => !x)}
      >
        {showPlaceHolder && <span className={styles.placeholder}>{placeholder}</span>}
        {!showPlaceHolder && <span className={styles.selected}>{selectedPackage?.package}</span>}

        <IoIosArrowDown color="#667185" height={20} width={20} />

        <div
          className={classNames(styles.dropdown, styles.data_packages, {
            [styles.open]: dropDown,
            [styles.close]: !dropDown,
          })}
          ref={dropdownRef}
        >
          <div className={styles.tabs}>
            <div
              className={classNames(styles.tab, { [styles.active]: tab === 'daily' })}
              onClick={(e) => {
                setTab('daily');
                e.stopPropagation();
              }}
            >
              Daily
            </div>
            <div
              className={classNames(styles.tab, { [styles.active]: tab === 'weekly' })}
              onClick={(e) => {
                setTab('weekly');
                e.stopPropagation();
              }}
            >
              Weekly
            </div>
            <div
              className={classNames(styles.tab, { [styles.active]: tab === 'monthly' })}
              onClick={(e) => {
                setTab('monthly');
                e.stopPropagation();
              }}
            >
              Monthly
            </div>
          </div>

          <div className={styles.packages}>
            {PACKAGE_AGGREGATE.filter((pkg) => {
              if (tab === 'daily') return DAILY_DATA_PACKAGES.includes(pkg);
              if (tab === 'weekly') return WEEKLY_DATA_PACKAGES.includes(pkg);
              return MONTHLY_DATA_PACKAGES.includes(pkg);
            }).map((pkg) => (
              <div
                key={pkg.package}
                className={styles.package}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPackage(pkg);
                  setDropDown(false);
                  onSelect(pkg);
                }}
              >
                <span>{pkg.package}</span>
                <span>₦{pkg.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

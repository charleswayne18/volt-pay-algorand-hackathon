'use client';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { NETWORK_PROVIDERS } from '@/constants';
import { IoIosArrowDown } from 'react-icons/io';

interface NetworkSelectorProps {
  onSelect: (network: string) => void;
  label?: string;
  selected?: string;
  placeholder?: string;
}

export const NetworkSelector = ({
  onSelect,
  label = 'Mobile network provider',
  selected = '',
  placeholder = 'Select network provider',
}: NetworkSelectorProps) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedNetwork, setSelectedNetwork] = useState(selected);
  const showPlaceHolder =
    NETWORK_PROVIDERS.find((network) => network.name === selectedNetwork) === undefined;

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
        {!showPlaceHolder && <span className={styles.selected}>{selectedNetwork}</span>}

        <IoIosArrowDown color="#667185" height={20} width={20} />

        <div
          className={classNames(styles.dropdown, {
            [styles.open]: dropDown,
            [styles.close]: !dropDown,
          })}
          ref={dropdownRef}
        >
          {NETWORK_PROVIDERS.map((network) => (
            <div
              key={network.name}
              className={styles.network}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNetwork(network.name);
                setDropDown(false);
                onSelect(network.name);
              }}
            >
              <img src={network.image} alt={network.name} />
              <span>{network.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

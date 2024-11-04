'use client';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';

interface GenericSelectorProps {
  onSelect: (network: string) => void;
  label: string;
  selected?: string;
  placeholder: string;
  options: { name: string; image?: string }[];
  loading?: boolean;
}

export const GenericSelector = ({
  onSelect,
  label,
  selected = '',
  placeholder,
  options,
  loading,
}: GenericSelectorProps) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(selected);
  const showPlaceHolder = options.find((option) => option.name === selectedOption) === undefined;

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
      {!loading && (
        <>
          <label>{label}</label>
          <div
            className={classNames(styles.input, styles.network_selector)}
            onClick={() => setDropDown((x) => !x)}
          >
            {showPlaceHolder && <span className={styles.placeholder}>{placeholder}</span>}
            {!showPlaceHolder && <span className={styles.selected}>{selectedOption}</span>}

            <IoIosArrowDown color="#667185" height={20} width={20} />

            <div
              className={classNames(styles.dropdown, {
                [styles.open]: dropDown,
                [styles.close]: !dropDown,
              })}
              ref={dropdownRef}
            >
              {options.map((option) => (
                <div
                  key={option.name}
                  className={styles.option}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption(option.name);
                    setDropDown(false);
                    onSelect(option.name);
                  }}
                >
                  {option.image && <img src={option.image} alt={option.name} />}
                  <span>{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {loading && (
        <>
          <label>
            <Skeleton />
          </label>
          <Skeleton className={styles.input} />
        </>
      )}
    </div>
  );
};

'use client';
import classNames from 'classnames';
import styles from './index.module.scss';
import { InputHTMLAttributes } from 'react';
import Skeleton from 'react-loading-skeleton';

interface DefaultInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  disabled?: boolean;
  loading?: boolean;
}

export const DefaultInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  type,
  disabled,
  loading,
}: DefaultInputProps) => {
  return (
    <div className={styles.form_group}>
      {!loading && (
        <>
          <label>{label}</label>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={classNames(styles.input, { [styles.error]: error })}
            disabled={disabled}
          />
          {error && <span className={styles.error}>{error}</span>}
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

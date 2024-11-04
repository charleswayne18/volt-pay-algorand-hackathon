'use client';
import classNames from 'classnames';
import styles from './index.module.scss';
import Skeleton from 'react-loading-skeleton';

interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  loading?: boolean;
}

export const PhoneInput = ({
  label = 'Phone number',
  placeholder = 'Enter phone number',
  value = '',
  onChange,
  error,
  loading,
}: PhoneInputProps) => {
  const handleChange = (value: string) => {
    const phone = value.replace(/\D/g, '');
    onChange(phone);
  };

  return (
    <div className={styles.form_group}>
      {!loading && (
        <>
          <label>{label}</label>
          <input
            type="tel"
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            className={classNames(styles.input, { [styles.error]: error })}
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

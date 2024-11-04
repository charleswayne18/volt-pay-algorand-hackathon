import styles from './index.module.scss';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'outline' | 'solid' | 'text';
  className?: string;
  colorScheme?: 'orange' | 'red';
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  variant = 'solid',
  className,
  colorScheme = 'orange',
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${styles[colorScheme]} ${className}`}
    >
      {label}
    </button>
  );
};

import { HiArrowNarrowLeft } from 'react-icons/hi';
import styles from './index.module.scss';

interface BackButtonProps {
  onClick: () => void;
  paths: string[];
  backButtonLabel?: string;
}

export const BackButton = ({ onClick, paths, backButtonLabel = 'Go Back' }: BackButtonProps) => {
  return (
    <div className={styles.back_button}>
      <div className={styles.back_arrow} onClick={onClick}>
        <div>
          <HiArrowNarrowLeft />
        </div>
        <p>{backButtonLabel}</p>
      </div>

      <h4>
        {paths.map((path, index) => (
          <>{index === paths.length - 1 ? <span>{path}</span> : `${path} / `}</>
        ))}
      </h4>
    </div>
  );
};

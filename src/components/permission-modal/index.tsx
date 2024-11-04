import { BackgroundOverlay } from '../background-overlay';
import { IoMdClose } from 'react-icons/io';
import styles from './index.module.scss';
import { ReactNode } from 'react';
import { Button } from '../buttons';

interface PermissionModalProps {
  visible: boolean;
  onClose: () => void;
  noBtnText?: string;
  yesBtnText?: string;
  title: string;
  content: ReactNode | string;
  onYes: () => void;
  onNo: () => void;
}

export const PermissionModal = ({
  visible,
  onClose,
  noBtnText = 'No',
  yesBtnText = 'Yes',
  title,
  content,
  onYes,
  onNo,
}: PermissionModalProps) => {
  return (
    <BackgroundOverlay visible={visible} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h4>{title}</h4>
          <IoMdClose onClick={onClose} />
        </div>

        <div className={styles.content}>{content}</div>

        <div className={styles.buttons}>
          <Button variant="outline" colorScheme="red" onClick={onNo} label={noBtnText} />
          <Button variant="solid" colorScheme="red" onClick={onYes} label={yesBtnText} />
        </div>
      </div>
    </BackgroundOverlay>
  );
};

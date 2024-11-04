'use client';

import { useRecoilState } from 'recoil';
import styles from './index.module.scss';
import { NotificationAtom } from '@/state/notification.atom';
import classNames from 'classnames';
import { ErrorIcon } from '@/assets/error.icon';
import { SuccessIcon } from '@/assets/success.icon';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export const Notifications = () => {
  const [notifications, setNotifications] = useRecoilState(NotificationAtom);
  const { push } = useRouter();

  const closeNotification = (initiated: number) => {
    setNotifications((prev) => {
      const newNotifications = { ...prev };
      delete newNotifications[initiated];
      return newNotifications;
    });

    clearInterval(notifications[initiated].id);
  };

  return (
    <div className={styles.wrapper}>
      {Object.values(notifications).map((notification) => (
        <div
          className={classNames(styles.notification, styles[notification.type])}
          key={notification.initiated}
          onClick={() => {
            if (notification.routeTo) {
              console.log('route to', notification.routeTo);
              push(notification.routeTo);
              closeNotification(notification.initiated);
            }
          }}
          style={{ cursor: notification.routeTo ? 'pointer' : 'default' }}
        >
          {notification.type === 'error' && <ErrorIcon className={styles.icon} />}

          {notification.type === 'success' && <SuccessIcon className={styles.icon} />}

          <div className={styles.content}>
            {notification.title && <h4>{notification.title}</h4>}
            <p>{notification.message}</p>
          </div>

          <div className={styles.close}>
            <IoMdClose
              onClick={(e) => {
                e.stopPropagation();
                closeNotification(notification.initiated);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

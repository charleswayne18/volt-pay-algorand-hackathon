import { NotificationAtom } from '@/state/notification.atom';
import { useSetRecoilState } from 'recoil';

interface props {
  type: 'error' | 'success';
  duration?: number;
  title?: string;
  message: string;
  routeTo?: string;
}

export const useNotification = () => {
  const setNotifications = useSetRecoilState(NotificationAtom);

  const notify = ({ type, duration = 5000, title, message, routeTo }: props) => {
    const initiated = Date.now();
    const id = setTimeout(() => {
      setNotifications((prev) => {
        const newNotifications = { ...prev };
        delete newNotifications[initiated];
        return newNotifications;
      });
    }, duration);

    setNotifications((prev) => ({
      ...prev,
      [initiated]: { type, duration, title, message, initiated, id, routeTo },
    }));

    return initiated;
  };

  return { notify };
};

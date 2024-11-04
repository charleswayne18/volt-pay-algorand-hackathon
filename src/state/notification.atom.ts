import { atom } from 'recoil';

interface Notification {
  title?: string;
  message: string;
  type: 'error' | 'success';
  duration: number;
  initiated: number;
  id?: NodeJS.Timeout;
  routeTo?: string;
}

export const NotificationAtom = atom<Record<number, Notification>>({
  key: 'notification',
  default: {},
});

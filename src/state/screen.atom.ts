import { atom } from 'recoil';

export type Screen = 'home' | 'airtime' | 'data' | 'bill';

export const ScreenAtom = atom<Screen>({
  key: 'screen',
  default: 'home',
});

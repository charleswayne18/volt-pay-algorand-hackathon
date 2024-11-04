import { atom } from 'recoil';

interface ConfirmPurchaseProviderProps {
  image: string;
  priceNGN: number;
  receiver: string;
  serviceMetadata?: string;
  serviceType: string;
  type: 'data' | 'airtime' | 'electricity' | 'television';
  operator: string;
  value: string;
}

export const ConfirmPurchaseAtom = atom<ConfirmPurchaseProviderProps | null>({
  key: 'confirmPurchase',
  default: null,
});

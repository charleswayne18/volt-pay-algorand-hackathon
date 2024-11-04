'use client';
import { Landing } from '@/components/landing';
import { useRecoilValue } from 'recoil';
import { ScreenAtom } from '@/state';
import { Airtime } from '@/components/airtime';
import { Data } from '@/components/data';
import { Bills } from '@/components/bills';

export const Home = () => {
  const screen = useRecoilValue(ScreenAtom);

  return (
    <>
      {screen === 'home' && <Landing />}

      {screen === 'airtime' && <Airtime />}

      {screen === 'data' && <Data />}

      {screen === 'bill' && <Bills />}
    </>
  );
};

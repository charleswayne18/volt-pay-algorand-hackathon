'use client';

import { useState } from 'react';
import styles from './index.module.scss';
import { BackButton } from '../back-button';
import { useSetRecoilState } from 'recoil';
import { ScreenAtom } from '@/state';
import classNames from 'classnames';
import { AiOutlineBulb } from 'react-icons/ai';
import { PiMonitorBold } from 'react-icons/pi';
import { Electricity } from './electricity';
import { Television } from './television';

export const Bills = () => {
  const [view, setView] = useState<'base' | 'electricity' | 'tv'>('base');
  const setScreen = useSetRecoilState(ScreenAtom);

  return (
    <div className={styles.container}>
      {view === 'base' && (
        <>
          <BackButton onClick={() => setScreen('home')} paths={['Home', 'Pay bill']} />

          <div className={styles.base}>
            <h4>Choose the bill you want to pay</h4>

            <div className={styles.options}>
              <div
                className={classNames(styles.option, styles.electricity)}
                onClick={() => setView('electricity')}
              >
                <AiOutlineBulb />
                <p>Electricity</p>
              </div>

              <div className={classNames(styles.option, styles.tv)} onClick={() => setView('tv')}>
                <PiMonitorBold />
                <p>Television</p>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'electricity' && (
        <>
          <BackButton onClick={() => setView('base')} paths={['Home', 'Pay bill', 'Electricity']} />

          <Electricity onGoBack={() => setView('base')} />
        </>
      )}

      {view === 'tv' && (
        <>
          <BackButton onClick={() => setView('base')} paths={['Home', 'Pay bill', 'Television']} />

          <Television onGoBack={() => setView('base')} />
        </>
      )}
    </div>
  );
};

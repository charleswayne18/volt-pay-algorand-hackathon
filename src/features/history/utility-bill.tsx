'use client';

import { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Electricity } from './electricity';
import { Television } from './television';

export const UtilityBill = () => {
  const [tab, setTab] = useState<'electricity' | 'tv'>('electricity');

  return (
    <>
      <div className={styles.bill_tabs}>
        <div
          onClick={() => setTab('electricity')}
          className={classNames(styles.tab, { [styles.active]: tab === 'electricity' })}
        >
          Electricity
        </div>

        <div
          onClick={() => setTab('tv')}
          className={classNames(styles.tab, { [styles.active]: tab === 'tv' })}
        >
          Television
        </div>
      </div>

      {tab === 'electricity' && <Electricity />}

      {tab === 'tv' && <Television />}
    </>
  );
};

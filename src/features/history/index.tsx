'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Data } from './data';
import { Airtime } from './airtime';
import { UtilityBill } from './utility-bill';
import { useRouter, useSearchParams } from 'next/navigation';

export const History = () => {
  const pageType = useSearchParams().get('type');
  const [activeTab, setActiveTab] = useState<'airtime' | 'utility bill' | 'data'>(
    ['airtime', 'utility bill', 'data'].includes(pageType || '') ? (pageType as any) : 'data',
  );
  const { push } = useRouter();

  const goToTab = (tab: 'airtime' | 'utility bill' | 'data') => {
    setActiveTab(tab);
    push(`/history?type=${tab}`);
  };

  useEffect(() => {
    if (pageType) {
      setActiveTab(pageType as any);
    }
  }, [pageType]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>
          <h2>Transactions history</h2>
          <p>View and manage all your transactions here</p>
        </div>
        <div className={styles.tabs}>
          <div
            onClick={() => goToTab('data')}
            className={classNames(styles.tab, { [styles.active]: activeTab === 'data' })}
          >
            Data
          </div>
          <div
            onClick={() => goToTab('airtime')}
            className={classNames(styles.tab, { [styles.active]: activeTab === 'airtime' })}
          >
            Airtime
          </div>
          {/* <div
            className={classNames(styles.tab, { [styles.active]: activeTab === 'utility bill' })}
            onClick={() => goToTab('utility bill')}
          >
            Utility bill
          </div> */}
        </div>
      </div>

      {activeTab === 'data' && <Data />}

      {activeTab === 'airtime' && <Airtime />}

      {activeTab === 'utility bill' && <UtilityBill />}
    </div>
  );
};

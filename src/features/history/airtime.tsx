'use client';

import { useAirtimeDataActions } from '@/actions/airtime-data';
import { Table } from '@/components/table';
import { IHistory } from '@/interface/history.interface';
import { ITableColumn, LOADING_STATUS } from '@/interface/table.interface';
import { commaFormat } from '@/utils/comma-format';
import { useWallet } from '@txnlab/use-wallet';
import { useEffect, useState } from 'react';
import { EmptyState } from './empty-state';
import { getHoursAndMinutes } from '@/utils/date-format';

export const Airtime = () => {
  const [loading, setLoading] = useState(false);
  const { getTransactionHistory } = useAirtimeDataActions();
  const headers = ['Airtime amount', 'Provider', 'Phone number', 'Price', '', ''];
  const [data, setData] = useState<IHistory[]>([]);
  const columns: ITableColumn[] = [
    {
      key: 'amount',
      render: (cell: number) => (
        <div className="font-medium text-[#101928]">₦ {commaFormat(cell)}</div>
      ),
    },
    {
      key: 'provider',
      render: (cell: { name: string; image: string }) => (
        <div className="flex items-center text-[#1D2739]">
          <img src={cell.image} alt={cell.name} className="w-8 h-8 mr-2" />
          {cell.name}
        </div>
      ),
    },
    {
      key: 'recipient',
      render: (cell: string) => cell,
    },
    {
      key: 'price',
      render: (cell: number) => (
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dggbmtpgx/image/upload/v1730222429/wallet_icons_ygr4bh.png"
            alt="wallet icon"
            className="w-6 h-6 mr-2"
          />
          <span className="mr-2 text-[#344054] text-sm">{commaFormat(cell)}</span>
        </div>
      ),
    },
    {
      key: 'date', //time with format 08:55 pm
      render: (cell: Date) => {
        const date = new Date(cell);
        return <span className="uppercase">{getHoursAndMinutes(date)}</span>;
      },
    },
    {
      key: 'date', //date with format 12th May, 2021
      render: (cell: Date) => {
        const date = new Date(cell);
        return `${date.getDate()} ${date.toLocaleString('default', {
          month: 'short',
        })}, ${date.getFullYear()}`;
      },
    },
  ];
  const { activeAddress } = useWallet();

  const fetchHistory = async () => {
    setLoading(true);
    const res = await getTransactionHistory('airtime', activeAddress || '');

    setLoading(false);

    if (res !== undefined) {
      setData(res);
    }
  };

  useEffect(() => {
    if (activeAddress) fetchHistory();
  }, [activeAddress]);

  return (
    <>
      {data.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <Table
          headers={headers}
          columns={columns}
          data={data}
          currentPage={1}
          status={loading ? LOADING_STATUS.PENDING : LOADING_STATUS.SUCCESS}
        />
      )}
    </>
  );
};

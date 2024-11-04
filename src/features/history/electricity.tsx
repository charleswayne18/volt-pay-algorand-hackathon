'use client';

import { Table } from '@/components/table';
import { MOCK_ELECTRICITY } from '@/constants/mock';
import { ITableColumn } from '@/interface/table.interface';
import { commaFormat } from '@/utils/comma-format';

export const Electricity = () => {
  const headers = ['Utility package', 'Provider', 'Metre number', 'Amount', 'Price', '', ''];
  const columns: ITableColumn[] = [
    {
      key: 'package',
      render: (cell: string) => <span className="font-medium text-[#101928]">{cell}</span>,
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
      key: 'receipient',
      render: (cell: string) => cell,
    },
    {
      key: 'amount',
      render: (cell: number) => (
        <div className="font-medium text-[#101928]">₦ {commaFormat(cell)}</div>
      ),
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
        return (
          <span className="uppercase">
            {date.getHours()}:{date.getMinutes()} {date.getHours() >= 12 ? 'pm' : 'am'}
          </span>
        );
      },
    },
    {
      key: 'date', //date with format 12th May, 2021
      render: (cell: Date) => {
        const date = new Date(cell);
        return `${date.getDate()}th ${date.toLocaleString('default', {
          month: 'short',
        })}, ${date.getFullYear()}`;
      },
    },
  ];

  return (
    <>
      <Table
        headers={headers}
        columns={columns}
        data={[...MOCK_ELECTRICITY, ...MOCK_ELECTRICITY, ...MOCK_ELECTRICITY]}
        currentPage={1}
      />
    </>
  );
};

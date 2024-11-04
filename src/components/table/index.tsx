import { ITableColumn, LOADING_STATUS } from '@/interface/table.interface';
import styles from './index.module.scss';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

interface TableProps {
  headers: string[];
  columns: ITableColumn[];
  data: object[];
  rowClickHandler?: (rowData: any) => void;
  children?: any;
  status?: LOADING_STATUS;
  currentPage: number;
  censorItems?: boolean;
}

export function Table({
  headers,
  columns,
  data,
  rowClickHandler,
  children,
  status = LOADING_STATUS.IDLE,
  currentPage,
  censorItems,
}: TableProps) {
  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        {data.length === 0 && status === LOADING_STATUS.IDLE ? (
          <p className={styles['empty-table']}>No Data To Display</p>
        ) : (
          <>
            <TableHeader headers={headers} />
            <TableBody
              columns={columns}
              data={data}
              headers={headers}
              rowClickHandler={rowClickHandler}
              status={status}
              pageNumber={currentPage}
              censorItems={censorItems}
            />
          </>
        )}
      </table>
      {children}
    </div>
  );
}

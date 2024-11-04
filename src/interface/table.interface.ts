export interface ITableColumn {
  key?: string;
  disableClick?: boolean;
  render: (
    cell: any,
    rowData?: object,
    index?: number,
    pageNumber?: number,
  ) => JSX.Element | string | number;
}

export enum LOADING_STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

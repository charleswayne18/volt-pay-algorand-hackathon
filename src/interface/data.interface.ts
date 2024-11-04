export interface IDataPackage {
  package: string;
  price: number;
}

export interface IDataPackageItem {
  operator: string;
  plan: string;
  label: string;
  validity: string;
  price: number;
  description: string;
}

export interface IDataPackageResponse {
  operator: string;
  operatorImage: string;
  packages: IDataPackageItem[];
}

export interface IOperator {
  operator: string;
  operatorImage: string;
}

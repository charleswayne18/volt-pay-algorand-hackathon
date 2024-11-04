export interface IHistory {
  package: string;
  provider: { name: string; image: string };
  recipient: string;
  amount: number;
  price: number;
  date: Date;
}

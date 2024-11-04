import styles from './index.module.scss';

interface TableHeaderProps {
  headers: string[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className={styles['table-header']}>
        {headers.map((item, index) => (
          <td key={index}>{item}</td>
        ))}
      </tr>
    </thead>
  );
}

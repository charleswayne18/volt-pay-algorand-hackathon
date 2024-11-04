import styles from './index.module.scss';

interface TableExtensionProps {
  increasePage: () => void;
  decreasePage: () => void;
  currentPage: number;
  totalPages: number;
}

export function TableExtension({
  increasePage,
  decreasePage,
  currentPage,
  totalPages,
}: TableExtensionProps) {
  return (
    <div className={styles['table-extension']}>
      <div className={styles['pagination-info']}>
        Page {currentPage} of {totalPages}
      </div>

      <div>
        <button onClick={decreasePage} disabled={currentPage <= 1}>
          {'Previous'}
        </button>
        <button
          onClick={increasePage}
          disabled={currentPage == totalPages || currentPage > totalPages}
        >
          {'Next'}
        </button>
      </div>
    </div>
  );
}

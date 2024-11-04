import styles from './index.module.scss';

export const EmptyState = () => {
  return (
    <div className={styles.empty_state}>
      <img src="https://res.cloudinary.com/dggbmtpgx/image/upload/v1730219660/Group_r7a6mk.png" />
      <h4>No transactions</h4>
      <p>You have not made any purchases. Your transactions would appear here</p>
    </div>
  );
};

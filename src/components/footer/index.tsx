import styles from './index.module.scss';

export const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img
          src="https://res.cloudinary.com/dggbmtpgx/image/upload/v1729632430/Top_y3jqhf.png"
          alt="logo"
        />
        <h4>VoltPay</h4>
      </div>

      <h4 className={styles.copy_right}>© 2024 . All Rights Reserved.</h4>
    </div>
  );
};

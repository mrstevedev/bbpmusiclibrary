import styles from "@/styles/Alert.module.scss";

export default function Alert({ message }) {
  return (
    <>
      <div className={`alert alert-danger ${styles.Alert}`}>
        <p className={styles.Alert__text}>{message}</p>
      </div>
    </>
  );
}

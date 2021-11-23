import styles from '../../styles/Alert.module.scss'

export default function Alert({ ...props }) {
    const { message } = props.error
  return (
    <>
      <div className={`alert alert-danger ${ styles.Alert }`}>
        <p className={styles.Alert__text}>
          {message}
        </p>
      </div>
    </>
  );
}

import { Alert } from "react-bootstrap";
import styles from "@/styles/AlertNotification.module.scss";

const AlertNotification = ({ data }) => {
  const description = data ? data[0].description : null;
  return (
    <Alert key={data.id} className={styles.AlertNotification}>
      {description}
    </Alert>
  );
};

export default AlertNotification;

import { Alert } from "react-bootstrap";

const AlertNotificationCart = ({ data }) => {
  const description = data ? data[0].description : null;
  return (
    <Alert key={"dark"} variant={"dark"}>
      {description}
    </Alert>
  );
};

export default AlertNotificationCart;

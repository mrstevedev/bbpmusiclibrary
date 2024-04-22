import styles from "@/styles/SidebarCart.module.scss";
import Link from "next/link";
import { Button } from "react-bootstrap";

export const ContinueShoppingButton = ({ handleCloseCart }) => {
  return (
    <>
      <Link href="/" passHref>
        <Button
          onClick={handleCloseCart}
          className={`btn btn-primary rounded-2 ${styles.SidebarCart__button}`}
        >
          Continue shopping
        </Button>
      </Link>
    </>
  );
};

export default ContinueShoppingButton;

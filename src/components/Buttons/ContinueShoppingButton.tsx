import styles from "@/styles/SidebarCart.module.scss";
import Link from "next/link";
import { Button } from "react-bootstrap";
import CustomI18nLink from "../LangToggle/CustomI18nLink";

export const ContinueShoppingButton = ({ handleCloseCart }) => {
  return (
    <>
      <Link href="/" passHref>
        <Button
          onClick={handleCloseCart}
          className={`btn btn-primary rounded-2 ${styles.BBP__SidebarCart_button}`}
        >
          Continue shopping
        </Button>
      </Link>
    </>
  );
};

export default ContinueShoppingButton;

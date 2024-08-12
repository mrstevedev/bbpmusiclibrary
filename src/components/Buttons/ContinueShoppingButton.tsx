import styles from "@/styles/SidebarCart.module.scss";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useLocale } from "next-intl";
import CustomI18nLink from "../LangToggle/CustomI18nLink";

export const ContinueShoppingButton = ({ handleCloseCart }) => {
  const locale = useLocale();

  return (
    <>
      <CustomI18nLink href="/checkout" locale={locale} passHref>
        <Button
          onClick={handleCloseCart}
          className={`btn btn-primary rounded-2 ${styles.BBP__SidebarCart_button}`}
        >
          Continue shopping
        </Button>
      </CustomI18nLink>
    </>
  );
};

export default ContinueShoppingButton;

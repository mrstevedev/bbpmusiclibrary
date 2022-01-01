import styles from '../../styles/SidebarCart.module.scss'
import Link from 'next/link'

export const ContinueShoppingButton = (props) => {
  return (
    <>
      <Link href="/">
        <a>
          <button
            onClick={props.handleCloseCart}
            className={`btn btn-primary rounded-0 ${styles.SidebarCart__button}`}>
            Continue shopping
          </button>
        </a>
      </Link>
    </>
  );
};

export default ContinueShoppingButton

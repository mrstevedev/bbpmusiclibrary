import cartImg from "../../public/images/cart.svg"
import Link from "next/link"
import styles from "../../styles/Header.module.scss"
import Image from "next/image"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

type Props = {
  handleShowCart: () => void
}

export default function CartIcon(props: Props) {
  const [cart, setCart] = useContext<any>( AppContext )
  const productsCount =
    ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 


  return (
    <>
      <Link href="/">
        <a
          onClick={props.handleShowCart}
          className={styles.btn__hover_scale}
          data-effect="st-effect-1"
        >
          <span className={`cart-count ${styles.cart__count}`}>
            {/* { productsCount !== null ? <span>{productsCount}</span> : '' } */}
          </span>
          <Image
            className="cart"
            src={cartImg}
            width="22"
            height="21"
            alt="shopping cart"
          />
        </a>
      </Link>
    </>
  );
}

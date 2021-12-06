import styles from '../styles/SidebarCart.module.scss'
import Image from "next/image";
import closeBtn from '../public/images/closeBtn.svg'
import { removeProduct } from '../util'
import Cart from '../components/sidebar/Cart'

// interface Props {
//     products: [],
//     showCart: boolean,
//     handleCloseCart: () => any
// }

export default function SidebarCart(props) {

    const handleRemoveItem = (id) => {
        console.log('Remove item from cart', id)
        removeProduct( id )
    }

    // console.log(products)

    return (
        <>
        <div onClick={props.handleCloseCart} className={ `fadeIn ${ styles.SidebarCart__overlay } ${ props.showCart === true ? ( 
            styles.SidebarCart__overlay_active  
            ) : '' }` }></div>
            <div className={`cart ${styles.SidebarCart} ${ props.showCart === true ? (
                styles.SidebarCart__active
            ) : '' }`}>
                <div className={styles.SidebarCart_top}>
                    <h1>Your Shopping Cart</h1>
                    <a href="#" onClick={props.handleCloseCart} className={styles.close__cart_scale}>
                        <Image src={closeBtn} width="14" height="14" alt="Close cart" />
                    </a>
                </div>

                <div className={styles.SidebarCart_btm}>
                    <Cart 
                        handleCloseCart={props.handleCloseCart} 
                        handleRemoveItem={handleRemoveItem}
                    />
                </div>
            </div>
        </>
    )
}
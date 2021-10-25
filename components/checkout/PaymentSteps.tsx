
import styles from '../../styles/Checkout.module.scss'

export default function PaymentSteps() {
    return (
    <>
        <h5 className={styles.Checkout__breadcrumb}>
            <span>Cart</span>
            <svg className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon" aria-hidden="true" focusable="false"> 
                 <svg id="chevron-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path></svg></svg>
             </svg>
             <span>Information</span>
            <svg className="icon-svg icon-svg--color-adaptive-light icon-svg--size-10 breadcrumb__chevron-icon" aria-hidden="true" focusable="false"> 
                <svg id="chevron-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M2 1l1-1 4 4 1 1-1 1-4 4-1-1 4-4"></path></svg></svg>
            </svg>
            <span>Payment</span>
        </h5>
    </>
    )
}
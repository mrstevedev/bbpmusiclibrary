import styles from '../styles/NotificationsBar.module.scss'

export default function Notifications(props) {
    return (
        <>
            <div className={ `${ styles.Notifications } Notifications__Mobile`}>
               <p className={ styles.Notifications__text }>
                    Fall 2021 30% off sale. Coupon code added to order at checkout
               </p>
            </div>
        </>
    )
}
import styles from '../styles/NotificationsBar.module.scss'

export default function NotificationsBar(props) {
    return (
        <>
            <div className={ `${ styles.NotificationsBar } Notifications__Mobile`}>
               <p className={ styles.NotificationsBar__text }>
                    Fall 2021 30% off sale. Coupon code added to order at checkout
               </p>
            </div>
        </>
    )
}
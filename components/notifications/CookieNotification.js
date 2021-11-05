import Link from 'next/link'
import styles from '../../styles/Cookie_Notification.module.scss'

export default function CookieNotification(props) {
    return (
        <>
            <div className={ styles.Cookie_Notification }>
                <p className={ styles.Cookie_Notification_Text }>
                    This site uses cookies to provide a great user experience. By using Bonita Basics Productions, you agree to our use of cookies.
                </p>
                <Link href="#">
                    <a className={styles.Cookie_Notification_Btn}>
                        Cancel
                    </a>
                </Link>

                <Link href="#">
                    <a className={styles.Cookie_Notification_Btn} onClick={ props.handleAcceptCookie }>
                        Accept
                    </a>
                </Link>
            </div>
        </>
    )
}
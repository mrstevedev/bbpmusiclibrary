// pages/404.js
import styles from '../styles/Error_404.module.scss'

export default function Custom404() {
    return (
        <div className={`container ${ styles.Error__404 }`} style={{
           
        }}>
            <h1 className={styles.Error__404__heading}>404 <span>|</span></h1>
            <h2 className={styles.Error__404__Subheading}>Page Not Found</h2>
        </div>
    )
  }
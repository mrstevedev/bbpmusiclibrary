import styles from "../styles/Header.module.scss";
import Image from "next/image";
import logo from '../public/images/5.svg'
import CartIcon from './cart/CartIcon'
import Link from "next/link"
import { Rotate as Hamburger } from 'hamburger-react'

export default function Header(props) { 

  return (
    <>
      <header className={styles.header}>
        <nav className="h-100">
          <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="col col-2 col-lg-2">
                <a onClick={(e) => props.handleToggleMenu(e)}>
                  <Hamburger toggled={props.isOpen} size={18} color={props.showMenu ? 'white' : 'black'} />
                </a>
              </div>
              <div className="col-sm col-8 d-flex justify-content-center hero-img">
                <Link href="/">
                  <a className="logo d-flex justify-content-center align-items-center">
                    <Image
                      src={logo}
                      height="65"
                      alt="bonitabasicsproductions" />
                  </a>
                </Link>
              </div>
              <div className="col col-2 col-lg-2 d-flex justify-content-end">
              <span className={ styles.header__signIn } style={{ fontWeight: 'bold', fontSize: '0.67rem', textTransform: 'uppercase', padding: '0.2rem 0 0 0' }}>
                {/* <Link href="/register">
                    <a style={{ margin: '0 0.3rem 0 0.3rem', color: '#333' }}>Register</a>
                  </Link>
                  <span style={{ color: '#333' }}>|</span> */}
                  Not Signed In?
                  <Link href="/signin">
                    <a className={ styles.header__link }>Sign-In</a>
                 </Link>
                </span>
                <CartIcon noCartEvent={props.noCartEvent} handleShowCart={props.handleShowCart} />
              </div>
          </div>
        </nav>
      </header>
    </>
  );
}

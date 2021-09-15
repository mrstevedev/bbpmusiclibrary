import styles from "../styles/Header.module.scss";
import Image from "next/image";
import logo from '../public/images/bonitabasicsproductions_logo.svg'
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
              <div className="col-sm col-8 d-flex justify-content-center">
                <Link href="/">
                  <a className="logo d-flex justify-content-center align-items-center">
                    <Image
                      src={logo}
                      height="21"
                      alt="bonitabasicsproductions" />
                  </a>
                </Link>
              </div>
              <div className="col col-2 col-lg-2 d-flex justify-content-end">
                <CartIcon handleShowCart={props.handleShowCart} />
              </div>
          </div>
        </nav>
      </header>
    </>
  );
}

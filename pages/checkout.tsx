import styles from '../styles/Checkout.module.scss'
import Image from 'next/image'
import React, { useState, useMemo, useContext, Fragment, useEffect } from 'react'
import { AppContext } from '../components/context/AppContext'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useStates } from 'react-us-states'
import SubmitPaymentButton from '../components/buttons/SubmitPaymentButton'
import Head from 'next/head'
import Link from 'next/link'
import PaymentSteps from '../components/checkout/PaymentSteps'
import ExpressCheckout from '../components/checkout/ExpressCheckout'
import SidebarCart from '../components/checkout/SidebarCart'

// Use next/script to add dynamic class to body
import Script from 'next/script'

interface Y {
  errorEmail?: boolean;
  errorFirstName?: boolean;
  errorLastName?: boolean;
  errorAddress?: boolean;
  errorApartment?: boolean;
  errorCity?: boolean;
  errorZipCode?: boolean;
  errorUSStates?: boolean;
  errorCountry?: boolean;
}

interface Product {
  databaseId: string,
  name: string,
  image: string
  price: number,
  slug: string
}

export default function Checkout() {
  const [cart, setCart] = useContext<any>( AppContext )

  const products =
  ( cart && Object.keys( cart ).length ) ? cart.products : ""

  console.log(products)

  const price = 
    ( null != cart && Object.keys( cart ).length ) ? cart.products[0].price : ""

  const productsCount =
  ( null != cart && Object.keys( cart ).length ) ? cart.totalProductsCount : "" 

  const productName =
    ( null != cart && Object.keys( cart ).length ) ? cart.products[0].name : ""
    // console.log(productName)

  const productFile =
   ( null != cart && Object.keys( cart ).length ) ? cart.products[0].downloads[0].file : ""

   const databaseId =
    ( null != cart && Object.keys( cart ).length ) ? cart.products[0].databaseId : ""
  
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [countryValue, setCountryValue] = useState({})
  const [usStates, setUsStates] = useState({})
  const countryOptions = useMemo(() => countryList().getData(), [])

  const [formSubmit, setFormSubmit] = useState(false)
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false)

  const states = useStates().map((state) => state)
  const newStates = states.map(({name, abbreviation}) => ({name, abbreviation}));

  const updatedStates = newStates.map(state => useMemo(() => {
    return {
      label: state.name,
      value: state.abbreviation
    };
  }, []));

  const [inputs, setInputs] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    zip: '',
    usStates: '',
    country: ''
  })

  const [error, setError] = useState<Y>({
    errorEmail: false,
    errorFirstName: false,
    errorLastName: false,
    errorAddress: false,
    errorCity: false,
    errorZipCode: false,
    errorUSStates: false,
    errorCountry: false
  })

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
   setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
   setError({ errorEmail: false })
  }

  function changeCountryHandler( val: any ) {
      setInputs(prevState => ({ ...prevState, country: val.label }))
  }

  function changeStatesHandler(val : any) {
      setInputs(prevState => ({ ...prevState, state: val.label }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(formSubmit){
      setTimeout(() => {
        setFormSubmit(false)
        if(inputs.email === '') {
          setHasErrors(true)
          setError({ errorEmail: true })
        } else if (inputs.firstName === '') {
          setHasErrors(true)
          setError({ errorFirstName: true })
        } else if(inputs.lastName === '') {
          setHasErrors(true)
          setError({ errorLastName: true })
        } else if (inputs.address === '') {
          setHasErrors(true)
          setError({ errorAddress: true })
        } else if(inputs.city === '') {
          setHasErrors(true)
          setError({ errorCity: true })
        } else if(inputs.zip === '') {
          setHasErrors(true)
          setError({ errorZipCode: true })
        } else {
          setHasErrors(false)
          setError({ ...prevState => !prevState })
          setFormSubmitSuccess(true)
        }
      }, 1000)
    }
  }

  function handleSubmitBtn(e: SubmitEvent) {
    setFormSubmit(true)
}

const handleRemoveItem = (id : string) => {
  console.log('Remove item from cart', id)
}

useEffect(() => {
  setLoading(true)
  const timer = setTimeout(() => {
    setLoading(false)
  }, 1500)
  return () => clearTimeout(timer)
}, [])

const handleToggleSummary = (e: any) => {
  const dropdown = document.querySelector('.dropdown');
  const toggler = document.querySelector('.toggle__dropdown');
  const toggleText = document.querySelector('.Checkout_order__summary__toggle__text__2eeom');
  const toggleTextHide = document.querySelector('.Checkout_Checkout__order__summary__toggle__text__hide__7PVul')
  toggler?.classList.toggle('active');
  toggleText?.classList.toggle('hide')
  toggleTextHide?.classList.toggle('show')
  dropdown?.classList.toggle('show');
}

    return (
        <>
        <Script
              dangerouslySetInnerHTML={{
                __html: `document.body.classList.add('Checkout__page')`
              }}
            />
          <main>
            <Head>
                <title>Bonita Basics Productions | Checkout</title>
                <meta name="description" content="Boom Bap HipHop producer from Bonita, California making sample packs with various musicians in his home studio." />
                <link rel="icon" href="/favicon.ico" />
              </Head>

                  <div className={styles.Checkout__left}>
                      <div className="d-flex justify-content-center">
                        <div className="row mb-2">
                          <Link href="/">
                            <a className="logo">
                              <Image src="/images/bonitabasicsproductions_logo.svg" width="110" height="20" alt="Bonita Basics Productions Logo" />
                            </a>
                          </Link>
                        </div>
                      </div>
                    

                  <div className={styles.Checkout__mobile_top}>
                      
                      {products ?
                        products.map((product: Product) => (
                          <Fragment key={product.databaseId}>
                          <aside role="complementary">
                            <button onClick={handleToggleSummary} className={`${ styles["order__summary_toggle"] } toggle__dropdown`} aria-expanded="false" aria-controls="order-summary" data-drawer-toggle="[data-order-summary]" aria-hidden="false">
                              <span className={ styles.wrap }>
                                <span className={ styles.order__summary__toggle__inner }>
                                  <span className="order-summary-toggle__icon-wrapper">
                                    <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg" className="order-summary-toggle__icon">
                                      <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                                    </svg>
                                  </span>
                                  {/* order-summary-toggle__text order-summary-toggle__text--show */}
                                  <span className={ styles.order__summary__toggle__text }>
                                    <span className={ styles.order__summary__toggle__text__inner }>Show order summary</span>
                                    <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg" className="order-summary-toggle__dropdown" fill="#000"><path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path></svg>
                                  </span>
                                  <span className={ `${ styles["order__summary__toggle__text"] } ${ styles["Checkout__order__summary__toggle__text__hide"] }` }>
                                    <span className={ styles.order__summary__toggle__text__inner }>Hide order summary</span>
                                    <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className="order-summary-toggle__dropdown" fill="#000"><path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path></svg>
                                  </span>
                                  <dl className="order-summary-toggle__total-recap total-recap" data-order-summary-section="toggle-total-recap">
                                    <dt className="visually-hidden"><span>Sale price</span></dt>
                                    <dd>
                                      <span className="order-summary__emphasis total-recap__final-price skeleton-while-loading" data-checkout-payment-due-target="2999">$29.99</span>
                                      </dd>
                                  </dl>
                                </span>
                              </span>
                            </button>
                          </aside>
                         <aside className={ `${ styles.Checkout__mobile_product_dropdown } dropdown` } role="complementary">
                         <div key={ product.databaseId } className={styles.Checkout__mobile_product}>
                            <div className={`${styles.Checkout__mobile_product_img}`}>
                            <span className="cart-count-mobile">{ productsCount }</span>

                            <Link href={`/product/${ product.slug }`}>
                              <a>
                                <Image src={product.image} width="91" height="91" alt={ product.name } />
                              </a>
                              </Link>
                              </div>

                                <div className={styles.Checkout__mobile_product_name}>
                                <h3 className={styles.Checkout__right_product_name_txt}>

                                  <Link href={`/product/${ product.slug }`}>
                                    <a style={{ color: '#333', fontWeight: 100 }}>
                                      { product.name }
                                    </a>
                                  </Link>
                                  <span>{ product.price }</span>
                                  </h3>

                                  </div>
                                {/* <a className="link" href="#" onClick={() => handleRemoveItem(product.productId)}>Remove</a> */}
                          </div>
                            <div className={styles.Checkout__mobile_product_total_row}>
                              <div className={styles.Checkout__mobile_product_total}>
                                <p>Total</p>
                              </div>
                              <div className={styles.Checkout__mobile_product_total_price}>
                                <p style={{ fontSize: '1.5rem' }}>
                                  <span style={{ fontSize: '0.7rem', fontWeight: 100 }}>USD</span> {product.price}
                                </p>
                              </div>
                            </div>
                         </aside>
                          </Fragment>
                        ))
                      : 'There are no items in your cart'}

                    </div>

                      <PaymentSteps />

                      <ExpressCheckout 
                        price={price}
                        databaseId={databaseId}
                        productFile={productFile}
                        productName={productName}
                        loading={loading}
                      />

                    <div className="alternative-payment-separator" data-alternative-payment-separator="">
                      <span className="alternative-payment-separator__content">
                        OR
                      </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <h3 className={styles.Checkout_heading}>Contact Information</h3>
                      <div className="mb-4">
                        {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                        <input onChange={handleChange} type="email" name="email" className={`form-control ${ error.errorEmail === true ? 'error' : '' }`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" autoFocus />
                        <div className="mt-2 mb-3 form-check">
                          <input onChange={handleChange} type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" htmlFor="exampleCheck1">Keep me up to date on news and offers</label>
                        </div>
                      </div>

                    <h3 className={styles.Checkout_heading}>Billing Address</h3>

                    <div className="mb-3 input-group">
                        <input onChange={handleChange} type="text" name="firstName" className={`form-control ${ error.errorFirstName === true ? 'error' : '' }`} id="firstName" aria-describedby="firstName" placeholder="First Name" />
                        <input onChange={handleChange} type="text" name="lastName" className={`form-control ${ error.errorLastName === true ? 'error' : '' }`} id="lastName" aria-describedby="lastName" placeholder="Last Name" />
                    </div>

                    <div className="mb-3">
                      <input onChange={handleChange} type="text" name="address" className={`form-control  ${ error.errorAddress === true ? 'error' : '' }`} id="address" aria-describedby="address" placeholder="Address" />
                      {/* <div className={styles.error__txt}>This field is required</div> */}
                    </div>

                    <div className="mb-3">
                      <input onChange={handleChange} type="text" name="apartment" className={`form-control`} id="apartment" aria-describedby="emailHelp" placeholder="Apartment, Suite (Optional)" />
                      {/* <div className={styles.error__txt}>This field is required</div> */}
                    </div>

                    <div className="mb-3 input-group">
                      <input onChange={handleChange} type="text" name="city" className={`form-control  ${ error.errorCity === true ? 'error' : '' }`} id="city" aria-describedby="emailHelp" placeholder="City" />
                      <input 
                        type="text"
                        onChange={handleChange} 
                        name="zip" 
                        className={`form-control ${ error.errorZipCode === true ? 'error' : '' }`}
                        id="zipcode" aria-describedby="zipcode" 
                        placeholder="Zip Code" 
                        />

                          <div className="invalid-feedback">
                            Please provide a valid zip.
                          </div>
                    </div>

                    <div className="mb-3">

                        <Select 
                          defaultValue={{ label: "Select State" }}
                          options={updatedStates}
                          val={usStates}
                          onChange={(val) => changeStatesHandler(val)}
                          className={ ` ${ error.errorUSStates === true ? 'error' : '' }` }
                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#f1f1f1',
                              primary: 'black',
                            },
                          })}
                         />
                      
                    </div>

                    <div className="mb-3">

                        <Select
                          defaultValue={{ label: "Select Country" }}
                          options={countryOptions} 
                          instanceId="long-value-select"
                          val={countryValue} 
                          onChange={(val) => changeCountryHandler(val)}
                          // className={ ` ${ error.errorCountry === true ? 'error' : '' }` }
                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary25: '#f1f1f1',
                              primary: 'black',
                            },
                          })}

                        />

                    </div>

                    <div className="row mb-3">
                      <div className="d-grid col-sm-12 col-md-4">
                        <SubmitPaymentButton formSubmit={formSubmit} handleSubmitBtn={handleSubmitBtn} />
                     </div>

                      <div className="col-sm-12 col-md-3 text-center pt-3">
                          <Link href="/cart">
                              <a className="step__footer__previous-link">
                                <svg focusable="false" aria-hidden="true" className="icon-svg icon-svg--color-accent icon-svg--size-10 previous-link__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M8 1L7 0 3 4 2 5l1 1 4 4 1-1-4-4"></path></svg>
                                <span className="text-dark p-1">Return to cart</span>
                              </a>
                          </Link>
                      </div>
                     </div>

                      <footer style={{ borderTop: 'solid 1px #ccc' }}>
                        <p style={{ fontWeight: 300, fontSize: '0.8rem', padding: '0.6rem' }}>All rights reserved BBPSampleLibrary</p>
                      </footer>

                  </form>

                {/* End Checkout__left */}
                </div> 
                {/* End Checkout__left */}

                <SidebarCart 
                  products={products} 
                  productsCount={productsCount} 
                  price={price}
                />

            </main>
        </>
    )
}
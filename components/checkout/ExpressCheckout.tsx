
import styles from '../../styles/Checkout.module.scss'
import { useState } from 'react'
import PaymentSkeletonBtn from '../../components/PaymentSkeletonBtn'
import { PayPalButton } from 'react-paypal-button-v2'
import GooglePayButton from "@google-pay/button-react"
import { formatPhoneNumber } from "../../util";
import Router from 'next/router'

interface IProps {
    loading: boolean
    price: number
    databaseId: number
    productName: string
    productFile: string
}

export default function ExpressCheckout(props : IProps) {

    const { loading, price, databaseId, productFile, productName } = props

    const [paid, setPaid] = useState(false)

    return (
        <>
         <div className={styles.Checkout__express}>
            <h5 className={ styles.Checkout__express_header }><span style={{ 
                background: '#fff',
                padding: '0 0.5rem'
                }}>Express Checkout</span></h5>
                
                { loading && (
                <>
                    <PaymentSkeletonBtn />
                    <PaymentSkeletonBtn />
                </>
                ) }
                
                { !loading && (
                <>
                    <PayPalButton
                style={{ 
                    height: 55
                }}
                options={{
                    // merchantId: "H3E758JAU25R6",
                    clientId: "sb",
                    currency: "USD",
                    disableFunding: 'venmo,card,credit'
                }}
                createOrder={(data: any, actions: any) => {
                    return actions.order.create({
                    purchase_units: [{
                        description: productName,
                        amount: {
                        currency_code: "USD",
                        value: price
                        }
                    }],
                        application_context: {
                        shipping_preference: "NO_SHIPPING"
                    }
                    });
                }}
                    onSuccess={(details: any) => {
                    const email_address = details.payer.email_address;
                    const address_line_1 = details.payer.address.address_line_1;
                    const admin_area_1 = details.payer.address.admin_area_1;
                    const admin_area_2 = details.payer.address.admin_area_2;
                    const postal_code = details.payer.address.postal_code;
                    const country_code = details.payer.address.country_code;
                    const phone = formatPhoneNumber( details.payer.phone.phone_number.national_number);
                    const id = details.id;
                    const first_name = details.payer.name.given_name;
                    const last_name = details.payer.name.surname;
                    const description = details.purchase_units[0].description;
                    const price = details.purchase_units[0].amount.value;

                    return fetch("http://localhost:5000/create-order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                        id: id,
                        email_address: email_address,
                        admin_area_1: admin_area_1,
                        admin_area_2: admin_area_2,
                        postal_code: postal_code,
                        country_code: country_code,
                        address_line_1: address_line_1,
                        phone: phone,
                        first_name: first_name,
                        last_name: last_name,
                        description: description,
                        price: price,
                        databaseId: databaseId,
                        file: productFile,
                        
                        payment_method: 'Paypal'
                        })
                    }).then(res => {
                        console.log(res)
                        if(res.ok) {
                        Router.push({
                            pathname: '/confirm',
                            query: `${ `success=true&email=${ email_address }&transaction_id=${ id }`}`
                        })
                        }                             
                    })
                    }}
                    onError={(err: object) => {
                    console.log(err)
                    }}
                />
                <GooglePayButton
                    environment="TEST"
                    buttonSizeMode="fill"
                    buttonType="plain"
                    style={{
                    width: "100%",
                    height: 55
                    }}
                    paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                        },
                    ],
                    merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant',
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: price.toString(),
                        currencyCode: 'USD',
                        countryCode: 'US',
                    },
                    callbackIntents: ['PAYMENT_AUTHORIZATION']
                    }}
                    onLoadPaymentData={paymentRequest => {
                    console.log('load payment data', paymentRequest);
                    setPaid(true)
                    }}
                    onPaymentAuthorized={paymentData => {
                    console.log('Payment Authorized Success', paymentData)
                    return { transactionState: "SUCCESS" }
                    }}
                />
                </>
                ) }
            </div>
        </>
    )
}
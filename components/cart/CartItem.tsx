
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IProduct {
    name: string
    image: string
    price: number
    qty: number
    totalPrice: number
    slug: string
}

interface IProducts {
    products: IProduct[]
    quantity: number
    totalStatePrice: number
    handleChange: (event: any) => void
}

export default function CartItem(props: IProducts) {
    return (
        <>
             { props.products ? props.products.map((product: IProduct) => (
                <Fragment key={product.name}>
                    <tr style={{ borderBottom: 'solid 1px #e2e2e2' }}>
                        <td style={{  width: '130px' }}>
                            <Link href={`product/${ product.slug }`}>
                                <a>
                                    <Image src={ product.image } width="150" height="150" />
                                </a>
                            </Link>
                        </td>
                        <td>
                            <Link href={`product/${ product.slug }`}><a className="link">{ product.name }</a></Link> <br/>
                            <a href="#" style={{ color: '#ccc', fontSize: '0.8rem' }}>Remove</a>
                        </td>
                        <td>
                            ${ product.price }
                        </td>
                        <td>
                            <input onChange={props.handleChange} type="number" value={props.quantity} step="1" min="1" pattern="[0-9]*" style={{ width: '45px' }} />
                        </td>
                        <td>
                            <div style={{  width: '50px' }}>
                            ${ props.totalStatePrice * props.quantity }
                            </div>
                        </td>
                    </tr>
                </Fragment>
            )) : 'There are no items in your cart' }
        </>
    )
}
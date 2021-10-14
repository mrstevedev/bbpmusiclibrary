import Link from "next/link";

interface IProduct {
    product: {
        name: string
    }
}

export default function Breadcrumb(props: IProduct) {

    const { product } = props;

    return (
    <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <a href="#">Product</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    { product.name }
                </li>
            </ol>
        </nav>
    </>
    )
}
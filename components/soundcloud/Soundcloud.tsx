import styles from '../../styles/Soundcloud.module.scss'

interface IDownloads {
    file: string
}
interface IRelated {
    node: {
        id: string
        image: {
            mediaItemUrl: string
        }
        name: string
        slug: string
    }
}

interface ICats {
   id: string
   name: string   
}

interface IProduct {
    product: {
        databaseId: number
        description: string
        downloadable: boolean
        downloads: IDownloads[]
        image: {
            mediaItemUrl: string
            id: string
        }
        name: string
        price: string
        productCategories: {
            nodes: ICats[]
        }
        shortDescription: string
        related: {
            edges: IRelated[]
        }
        sku: string
    }
}

export default function Soundcloud(props: IProduct) {
    const { sku, name, shortDescription } = props.product
    return (
        <>
         <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={ `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${ sku }&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true` }></iframe>
            <div>
                <a href="https://soundcloud.com/marioluciano425" title="Polyphonic Music Library" target="_blank" rel="noreferrer" className={ styles.Soundcloud__name }>Polyphonic Music Library</a> · 
                <a href={ shortDescription } title="1.Soul Expressions (Kit Preview)" target="_blank" rel="noreferrer" className={ styles.Soundcloud__shortDescription }> { name }</a>
            </div>
        </>
    )
}
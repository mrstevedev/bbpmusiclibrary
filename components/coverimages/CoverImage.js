import styles from '../../styles/CoverImage.module.scss'

export default function CoverImage(props) {
    return (
        <>
            <div className={ `hero-img ${ styles.cover__image }` } style={{ 
                backgroundImage: `url(${'./images/img1200.webp'})`}}></div>
        </>
    )
}
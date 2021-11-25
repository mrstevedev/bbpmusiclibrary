import styles from '../styles/CoverImage.module.scss'
import CoverImage from '../components/coverimages/CoverImage'

export default function Videos() {
    return (
        <> 
        <CoverImage />
            <div className="container">
                <h1 style={{ fontWeight: 100, margin: '3rem 0 2rem 0', fontSize: '0.7rem', textTransform: 'uppercase' }}>Music Videos</h1>

                <div>
                    <iframe width="960" height="615" src="https://www.youtube.com/embed/UJsgB1fWqQQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div>
                    <iframe width="960" height="615" src="https://www.youtube.com/embed/Z0O6jRflTrI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </>
    )
}
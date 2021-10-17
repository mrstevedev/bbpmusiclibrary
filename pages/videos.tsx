

export default function Videos() {
    return (
        <> 
         <div className="hero-img" style={{ backgroundImage: `url(${'./images/img1200.webp'})`, 
          height: '270px',
          width: '100%',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          margin: '2rem 0 2rem 0', borderRadius: '3px' }}></div>
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
// pages/404.js
export default function Custom404() {
    return (
        <div className="container" style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '85vh',
            display: 'flex'
        }}>
            <h1 style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
            }}>404 <span style={{ padding: '0 0.3rem' }}>|</span></h1>
            <h2 style={{
                    fontWeight: 100,
                    textTransform: 'uppercase',
                    fontSize: '1rem'
            }}>Page Not Found</h2>
        </div>
    )
  }
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/LostPw.module.scss'
import CoverImage from '../components/coverimages/CoverImage'

export default function LostPW() {

    const [formSubmit, setFormSubmit] = useState(false)
    const [user, setUser] = useState({
        email: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser( prevState => ({ ...prevState, [event.target.name]: event.target.value }) )
    }

    const handleSubmit = (event: FormEvent) => {
        setFormSubmit(true)
    }

    return (
        <>
        <CoverImage />
        <div className="container">
            <div className="content__main">

            { !formSubmit ? (
            <>
                <h1 className={ styles.Lostpw__heading }>Forgot Password</h1>
                <p style={{ fontWeight: 100 }}>Enter your email to reset your password</p>
                <div className={styles.LostPw__container}>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="mb-2 input-group">
                        <input required onChange={handleChange} type="email" name="email" className={`form-control`} id="email" aria-describedby="email" placeholder="Email" />
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                        <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </div>
                    </form>

                    <hr />

                </div>

                <div className="mt-3">
                    <h2 style={{ fontSize: '1.1rem' }}>Back to sign in <Link href="/signin">
                        <a style={{  color: "#5782bf" }}>here</a>
                        </Link>
                    </h2>
                </div>
            </>
            ) : (
                <>
                    <h5>Email submitted successfully</h5>
                    <p style={{ fontWeight: 100 }}>Instruction on how to reset your password have been sent to your email</p>
                </>
            ) }

           
          
           </div>
        </div>
    </>
    )
}
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import CoverImage from '../components/coverimages/CoverImage'
import styles from '../styles/SignIn.module.scss'

export default function Signin() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser( prevState => ({ ...prevState, [event.target.name]: event.target.value }) )
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const userJSON = JSON.stringify(user)

        axios.post('http://localhost:10028/wp-json/wp/v2/users', userJSON, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MTAwMjgiLCJpYXQiOjE2MzM1NjQ2ODMsIm5iZiI6MTYzMzU2NDY4MywiZXhwIjoxNjM0MTY5NDgzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxMCJ9fX0.hxWdsTIJUktLBqJ1oMqq7JKvQ8hf755QmjcTHrrTx9I'
            }
        }).then(res => console.log(res))
    }

    return (
        <>
        <CoverImage />
            <div className="container">
                <div className="content__main">
                <h1 className={ styles.SignIn__heading }>Sign In</h1>
                <p className={ styles.SignIn__subHeading }>Sign in to your customer account</p>

               <div className={styles.SignIn__form__container}>
               <form method="post" onSubmit={handleSubmit}>
                    <div className="mb-2 input-group">
                        <input autoFocus required onChange={handleChange} type="text" name="username" className={`form-control`} id="username" aria-describedby="username" placeholder="Username" />
                    </div>
                    <div className="mb-2 input-group">
                        <input required onChange={handleChange} type="password" name="password" className={`form-control`} id="password" aria-describedby="password" placeholder="Password" />
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                        <button className="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <div className="col-sm-8 pt-2">
                            <p style={{ fontSize: '0.9rem', fontWeight: 100 }}>
                                
                                <Link href="/lostpw">
                                    <a style={{  color: "#5782bf" }}> Forgot password?</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
                <hr style={{ color: '#ccc' }} />

               </div>
               <div className="mt-3">
                    <h2 style={{ fontSize: '1.1rem' }}>Not registered? Register <Link href="/register">
                        <a style={{  color: "#5782bf" }}>here</a>
                        </Link>
                    </h2>
                </div>
               </div>
            </div>

        </>
    )
}
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import CoverImage from '../components/coverimages/CoverImage'
import styles from '../styles/Register.module.scss'

export default function Register() {
    const [formSubmit, setFormSubmit] = useState(false)
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: ''
    })

    const [error, setError] = useState({ message: '' })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const customerJSON = JSON.stringify(customer)

            axios.post('http://localhost:5000/register-customer', customerJSON, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                // console.log(res)
                // console.log(res.data)
                if(res.data === '') {
                    setFormSubmit(true)
                } else {
                    document.querySelector('.alert')?.classList.add('active');
                    setTimeout(() => document.querySelector('.alert')?.classList.remove('active'), 7000)
                    // console.log(alertMsg)
                    setError({ message: res.data })
                }
                
            }).catch(error => console.log(error))
    }

    return (
        <>
        <CoverImage />
            <div className="container">
                <div className="content__main">
                { !formSubmit ? (
                    <>
                    <h1 className={ styles.Register__heading }>Register</h1>
                    <p className={ styles.Register__subHeading }>Register an account to purchase a sample pack</p>

                    <div className={styles.Register__form__container}>
                            <form onSubmit={ handleSubmit }>
                            <div className="mb-2 input-group">
                                <input autoFocus required onChange={handleChange} type="text" name="firstName" className={`form-control`} id="firstName" aria-describedby="firstName" placeholder="First Name" />
                                <input required onChange={handleChange} type="text" name="lastName" className={`form-control`} id="lastName" aria-describedby="lastName" placeholder="Last Name" />
                            </div>
                            <div className="mb-2 input-group">
                                <input required onChange={handleChange} type="text" name="username" className={`form-control`} id="username" aria-describedby="username" placeholder="Username" />
                            </div>
                            <div className="mb-2 input-group">
                                <input required onChange={handleChange} type="password" name="password" className={`form-control`} id="password" aria-describedby="password" placeholder="Password" />
                            </div>
                            <div className="mb-2 input-group">
                                <input required onChange={handleChange} type="email" name="email" className={`form-control`} id="email" aria-describedby="email" placeholder="Email" />
                            </div>
                            <button className="btn btn-primary btn-block">Register</button>
                        </form>
                     
                        <hr />

                    </div>

                       </>
                        ) : (
                            <div className={ styles.Register__confirm }>
                                <h2  className={ styles.Register__confirm__heading }>Success!</h2>
                                <h5 className={ styles.Register__confirm__text }>Your account has been created successfully</h5>

                                <hr />

                            </div>
                        )}

                    <div className="mt-3">
                    <h2 className={ styles.Register__signIn }>Already registered? Sign-In <Link href="/signin">
                        <a className={ styles.Register__link }>here</a>
                        </Link>
                    </h2>
                </div>
                </div>
            </div>

            <div className="alert alert-danger" style={{ padding: '0.4rem 2.5rem',
                position: 'fixed',
                bottom: '-5rem',
                width: '100%',
                height: '75px',
                left: 0,
                display: 'flex',
                zIndex: 2,
                margin: 0,
                alignItems: 'center', transition: '0.22s ease-in-out' }}>
                <p style={{ margin: '0' }}>{ error.message }</p>
            </div>


        </>
    )
}

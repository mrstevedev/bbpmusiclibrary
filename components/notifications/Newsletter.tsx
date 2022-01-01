import Image from "next/image";
import closeBtn from '../../public/images/closeBtn.svg'
import styles from '../../styles/Modal.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import clientConfig from '../../clientConfig'

interface Props {
    handleCloseModal: () => void
}

export default function Modal(props: Props) {

    const [formSubmit, setFormSubmit] = useState(false)
    const [subscriber, setSubscriber] = useState({
        first_name: '',
        email: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setSubscriber( prevState => ({ ...prevState, [event.target.name]: event.target.value }) )
    }
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const subscriberJSON = JSON.stringify(subscriber)
        
        axios.post('http://localhost:10028/wp-json/newsletter/v2/subscribers', subscriberJSON, {
            headers: { 
                "Content-Type": "application/json"
            },
            auth: {
                username: clientConfig.CLIENT_KEY,
                password: clientConfig.CLIENT_SECRET
            }
        }).then(res => {
            setFormSubmit(true)
        })
        .catch(err => console.log(err))
        
        console.log('submit form to newsletter platform')
    }
    
    return (
        <>
        <div className={ styles.modal__overlay } onClick={props.handleCloseModal}>
            <div className={ `${ styles.modal__subscription } fade-in`}>
                <div className={styles.modal__body} onClick={(event) => event.stopPropagation()}>
                    <div className={ styles.modal__left }>
                        <div className={ styles.modal__modalHeader }>
                            <a href="#" onClick={props.handleCloseModal}>
                                <Image className={ styles.btn__close } src={closeBtn} width="14" height="14" alt="Close cart" />
                            </a>
                        </div>
                    </div>
                    <div className={ styles.modal__right }>
                        <div className={ styles.modal__header }>
                            <a href="#" onClick={props.handleCloseModal}>
                                <Image className={ styles.btn__close } src={closeBtn} width="14" height="14" alt="Close cart" />
                            </a>
                        </div>
                        { !formSubmit ? (
                            <>
                            <div className={ styles.form__container }>
                            <h1>Subscribe<br /> To My Newsletter</h1>
                                <form onSubmit={ handleSubmit }>
                                <div className="mb-2 input-group">
                                    <input autoFocus required onChange={handleChange} type="text" name="first_name" className={`form-control`} id="first_name" aria-describedby="name" placeholder="Name" />
                                </div>
                                <div className="mb-2 input-group">
                                    <input required onChange={handleChange} type="email" name="email" className={`form-control`} id="email" aria-describedby="email" placeholder="Email" />
                                </div>
                                <button className="btn btn-primary col-12">Subscribe</button>
                            </form>
                        
                            <hr />
                            <p>
                                Subscribe to my newsletter to receive notifications on new download releases
                                and offers to get sales on sample packs.
                            </p>

                            </div>
                            </>
                        ) : (
                            <div className={ styles.form__container }>
                                <h1>Thank you<br /> You are now subscribed!</h1>
                            </div>
                        )  }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
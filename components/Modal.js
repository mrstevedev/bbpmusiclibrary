import Image from "next/image";
import closeBtn from '../public/images/closeBtn.svg'
import styles from '../styles/Modal.module.scss'

const handleChange = (event) => {

}

const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('submit form to newsletter platform')
}

export default function Modal(props) {
    return (
        <>
        <div className={ styles.modal__overlay } onClick={props.handleCloseModal}>
            <div className={ `${ styles.modal__subscription } fade-in`}>
                <div className={styles.modal__body}>
                    <div className={ styles.modal__left }>
                    </div>
                    <div className={ styles.modal__right }>
                        <div className={ styles.modal__header }>
                            <a href="#" onClick={props.handleCloseModal}>
                                <Image className={ styles.btn__close } src={closeBtn} width="14" height="14" alt="Close cart" />
                            </a>
                        </div>
                        <div className={ styles.form__container }>
                            <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Subscribe<br /> To My Newsletter</h1>
                                <form onSubmit={ handleSubmit }>
                                <div className="mb-2 input-group">
                                    <input required onChange={handleChange} type="text" name="name" className={`form-control`} id="name" aria-describedby="name" placeholder="Name" />
                                </div>
                                <div className="mb-2 input-group">
                                    <input required onChange={handleChange} type="email" name="email" className={`form-control`} id="email" aria-describedby="email" placeholder="Email" />
                                </div>
                                <button className="btn btn-primary col-12">Subscribe</button>
                            </form>
                        
                            {/* <hr style={{ color: '#ccc' }} /> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
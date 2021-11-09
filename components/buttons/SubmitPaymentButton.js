import Spinner from '../Spinner'

export default function SubmitPaymentButton(props) {

  return (
    <>
      <button type="submit" className="btn btn-primary btn-block p-3" onClick={props.handleSubmitBtn}>
        <span style={{ fontSize: '0.9rem' }}>{props.formSubmit ? <Spinner /> : 'Continue to payment' }</span>
      </button>
    </>
  );
}

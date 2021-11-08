

interface Props {
  addItemToast: boolean,
  handleCloseToast: () => any
}

export default function Toast(props : Props) {
  return (
    <>
      <div className="toast-container">
        <div
            className={`${props.addItemToast === true ? 'show' : ''}  toast align-items-center`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-inner d-flex align-items-center">
                <div className="toast-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="17" viewBox="0 0 24 19">
                    <path id="iconmonstr-check-mark-1" d="M20.285,2,9,13.567,3.714,8.556,0,12.272,9,21,24,5.715Z" transform="translate(0 -2)"/>
                  </svg>
                </div>
                <div className="toast-body">Successfully added to cart</div>
                <button
                    type="button"
                    className="btn-close me-3 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={props.handleCloseToast}
                ></button>
            </div>
        </div>
      </div>
    </>
  );
}

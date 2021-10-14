
import Soundcloud from '../../components/soundcloud/Soundcloud';

export default function ProductTabs(props) {
    return (
        <>
            <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                onClick={props.handleToggleTab}
                className="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Listen
              </button>
              <button
                onClick={props.handleToggleTab}
                className="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Downloads
              </button>
              {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
           {/* Soundcloud */}
            <Soundcloud
              product={props.product}
            />
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <p>
                Show a graph using a graph library of downloads that occur
                throughout a year.
              </p>

              <p>
                Donec sollicitudin molestie malesuada. Donec sollicitudin
                molestie malesuada. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Praesent sapien massa,
                convallis a pellentesque nec, egestas non nisi. Pellentesque in
                ipsum id orci porta dapibus. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.
                Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet
                quam id dui posuere blandit. Sed porttitor lectus nibh.
              </p>
            </div>
          </div>
        </>
    )
}
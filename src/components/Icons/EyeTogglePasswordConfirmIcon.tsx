import { Fragment } from "react";

import { useToggleVisibility } from "../..//hooks/useToggleVisibility";

export default function EyeToggleIconPasswordConfirm({ left, right }) {
  const { toggleVisibilityConfirm, togglerConfirm } = useToggleVisibility();

  return (
    <Fragment>
      {toggleVisibilityConfirm ? (
        <i
          className="bi bi-eye-fill"
          style={{
            position: "absolute",
            zIndex: 6,
            left: left ? left : null,
            right: right ? right : null,
            top: "0.5rem",
          }}
          onClick={togglerConfirm}
        ></i>
      ) : (
        <i
          className="bi bi-eye-slash-fill"
          style={{
            position: "absolute",
            zIndex: 6,
            left: left ? left : null,
            right: right ? right : null,
            top: "0.5rem",
          }}
          onClick={togglerConfirm}
        ></i>
      )}
    </Fragment>
  );
}

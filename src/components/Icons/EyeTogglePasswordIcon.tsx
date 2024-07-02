import { Fragment } from "react";

import { useToggleVisibility } from "@/hooks/useToggleVisibility";

export default function EyeToggleIconPassword({ left, right }) {
  const { toggleVisibility, toggler } = useToggleVisibility();

  return (
    <Fragment>
      {toggleVisibility ? (
        <i
          className="bi bi-eye-fill"
          style={{
            position: "absolute",
            zIndex: 6,
            left: left ? left : null,
            right: right ? right : null,
            top: "0.5rem",
          }}
          onClick={toggler}
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
          onClick={toggler}
        ></i>
      )}
    </Fragment>
  );
}

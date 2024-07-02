/**
 * Toggle Visibility Hook
 */

import { useState } from "react";

export const useToggleVisibility = () => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [toggleVisibilityConfirm, setToggleVisibilityConfirm] = useState(false);

  const toggler = () => {
    setToggleVisibility((prev) => !prev);
    toggleVisibility
      ? document.getElementById("password")?.setAttribute("type", "password")
      : document.getElementById("password")?.setAttribute("type", "text");
  };

  const togglerConfirm = () => {
    setToggleVisibilityConfirm((prev) => !prev);
    toggleVisibilityConfirm
      ? document
          .getElementById("passwordConfirm")
          ?.setAttribute("type", "password")
      : document
          .getElementById("passwordConfirm")
          ?.setAttribute("type", "text");
  };

  return { toggleVisibility, toggleVisibilityConfirm, toggler, togglerConfirm };
};

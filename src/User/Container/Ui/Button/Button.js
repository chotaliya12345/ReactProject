import React from "react";
import { PrimaryButton, SecondaryButton } from "./Button.style";

function Button({
  children,
  btnType = "primary",
  btnDisable = false,
  ...rest
}) {
  console.log(btnType);
  const checkBtnType = () => {
    switch (btnType) {
      case "primary":
        return PrimaryButton;
      case "secondary":
        return SecondaryButton;
      default:
        return PrimaryButton;
    }
  };

  const Custombtn = checkBtnType();
  return (
    <>
      <Custombtn disabled={btnDisable} {...rest}>
        {children}
      </Custombtn>
    </>
  );
}

export default Button;

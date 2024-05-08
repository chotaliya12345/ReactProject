import React from "react";
import { ContectInput, SpanError } from "./Input.style";

function Input({ errorText, ...props }) {
  return (
    <>
      <ContectInput {...props} />
      <SpanError>{errorText}</SpanError>
    </>
  );
}

export default Input;

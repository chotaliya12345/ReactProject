import styled from "styled-components";

const BaseButton = styled.button`
  transition: 0.5s;
  cursor: pointer;
  font-weight: 600;
  transition: 0.5s;
  border-radius: 50rem !important;
  text-transform: uppercase !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
  margin-left: 1.5rem !important;
  margin-bottom: 1.5rem !important;
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  -moz-user-select: none;
  user-select: none;
  font-size: 1rem;
`;

export const PrimaryButton = styled(BaseButton)`
  color: #81c408 !important;
  background-color: ${(props) =>
    props.disabled ? "gray" : "rgba(0, 0, 0, 0)"};
  border: 1px solid (255, 181, 36);

  &:hover {
    background: ${(props) =>
      props.disabled ? "gray" : "var(--bs-secondary)"};
    color: var(--bs-white) !important;
  }
`;

export const SecondaryButton = styled(BaseButton)`
  color: rgb(255, 255, 255) !important;
  background-color: rgb(129, 196, 8);
  border: 1px solid rgba(0, 0, 0, 0);
  position: absolute;
  top: 0px;
  right: 0px;

  &:hover {
    background: var(--bs-secondary) !important;
    color: var(--bs-white) !important;
  }
`;

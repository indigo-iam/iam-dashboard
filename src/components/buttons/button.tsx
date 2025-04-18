// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import React from "react";
import "./button.css";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "danger-secondary"
  | "danger-tertiary";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  action?: ButtonColor;
}

export default function Button(props: Readonly<ButtonProps>) {
  const { children, action, ...buttonProps } = props;
  let className: string;

  switch (action) {
    case "primary":
      className = "btn-primary";
      break;
    case "secondary":
      className = "btn-secondary";
      break;
    case "tertiary":
      className = "btn-tertiary";
      break;
    case "danger":
      className = "btn-danger";
      break;
    case "danger-secondary":
      className = "btn-danger-secondary";
      break;
    case "danger-tertiary":
      className = "danger-tertiary";
      break;
    default:
      className = "btn-primary";
  }
  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}

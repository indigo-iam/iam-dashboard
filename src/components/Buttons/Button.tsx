import React from "react";

export type ButtonColor =
  | "primary"
  | "primary-outline"
  | "secondary"
  | "secondary-outline"
  | "success"
  | "success-outline"
  | "warning"
  | "warning-outline"
  | "danger"
  | "danger-outline";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "reset" | "submit";
  icon?: React.ReactNode;
  isSmall?: boolean;
  action?: ButtonColor;
}

export default function Button(props: Readonly<ButtonProps>): JSX.Element {
  const { children, icon, isSmall, action, ...buttonProps } = props;
  let buttonStyle = "min-w-12 px-2 py-1 h-8 ";
  switch (action) {
    case "primary":
      buttonStyle += "btn-primary";
      break;
    case "primary-outline":
      buttonStyle += "btn-primary-outline";
      break;
    case "success":
      buttonStyle += "btn-success";
      break;
    case "success-outline":
      buttonStyle += "btn-success-outline";
      break;
    case "warning":
      buttonStyle += "btn-warning";
      break;
    case "warning-outline":
      buttonStyle += "btn-warning-outline";
      break;
    case "danger":
      buttonStyle += "btn-danger";
      break;
    case "danger-outline":
      buttonStyle += "btn-danger-outline";
      break;
    default:
      buttonStyle += "btn-primary";
  }

  if (isSmall) {
    buttonStyle += " !px-1.5 !py-0.5";
  }

  return (
    <button {...buttonProps} className={buttonStyle}>
      <div className="flex">
        {icon ? (
          <div className={`my-auto me-2 ${isSmall ? "h-3 w-3" : "h-5 w-5"}`}>
            {icon}
          </div>
        ) : null}
        <small className="m-auto">{children}</small>
      </div>
    </button>
  );
}

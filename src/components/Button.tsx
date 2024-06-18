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

export default function Button(props: ButtonProps): JSX.Element {
  const { children, icon, isSmall, action, ...buttonProps } = props;
  let className = "btn-primary";
  switch (action) {
    case "primary":
      className = "btn-primary";
      break;
    case "primary-outline":
      className = "btn-primary-outline";
      break;
    case "success":
      className = "btn-success";
      break;
    case "success-outline":
      className = "btn-success-outline";
      break;
    case "warning":
      className = "btn-warning";
      break;
    case "warning-outline":
      className = "btn-warning-outline";
      break;
    case "danger":
      className = "btn-danger";
      break;
    case "danger-outline":
      className = "btn-danger-outline";
      break;
    default:
  }

  return (
    <button
      {...buttonProps}
      className={className + `${isSmall ? " !px-1.5 !py-0.5" : ""}`}
    >
      <div className="flex">
        {icon ? (
          <div className={`my-auto me-2 ${isSmall ? "h-3 w-3" : "h-5 w-5"}`}>
            {icon}
          </div>
        ) : null}
        <small className="my-auto">{children}</small>
      </div>
    </button>
  );
}

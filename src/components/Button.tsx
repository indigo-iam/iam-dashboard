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

export const Button = (props: ButtonProps): JSX.Element => {
  const { children, icon, isSmall, action, ...buttonProps } = props;
  const className = `btn-${action ?? "primary"}`;

  return (
    <button {...buttonProps} className={className}>
      <div className="flex">
        {icon ? (
          <div
            className="my-auto me-2"
            style={{
              width: isSmall ? "16px" : "24px",
              height: isSmall ? "16px" : "24px",
            }}
          >
            {icon}
          </div>
        ) : null}
        <small className="my-auto">{children}</small>
      </div>
    </button>
  );
};

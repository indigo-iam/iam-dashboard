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
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { className, children, color, icon, isSmall, ...buttonProps } = props;
  const classColor = `infn-btn infn-btn-${color ?? "primary"}`;

  return (
    <div className={className}>
      <button
        {...buttonProps}
        className={`infn-btn ${classColor} ${isSmall ? "infn-btn-sm" : ""}`}
      >
        <div className="d-flex">
          {icon ? (
            <div
              className="me-2 my-auto"
              style={{
                width: isSmall ? "16px" : "24px",
                height: isSmall ? "16px" : "24px",
              }}
            >
              {icon}
            </div>
          ) : null}
          <div className="my-auto">{children}</div>
        </div>
      </button>
    </div>
  );
};

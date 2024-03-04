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

export interface ButtonProps {
  type?: "button" | "reset" | "submit";
  color?: ButtonColor;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  small?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    type,
    className,
    style,
    children,
    color,
    icon,
    disabled,
    small,
    onClick,
  } = props;
  const classColor = `infn-btn infn-btn-${color ?? "primary"}`;
  return (
    <div className={className}>
      <button
        className={`infn-btn ${classColor} ${small ? "infn-btn-sm" : ""}`}
        style={style}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="d-flex">
          {icon ? (
            <div
              className="me-2 my-auto"
              style={{
                width: small ? "16px" : "24px",
                height: small ? "16px" : "24px",
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

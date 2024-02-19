import React from "react";

export type ButtonColor =
  | "primary"
  | "primary-outline"
  | "secondary"
  | "secondary-outline"
  | "success"
  | "success-outline"
  | "danger"
  | "danger-outline"
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
  onClick?: () => void;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { type, className, style, children, color, icon, disabled, onClick } =
    props;
  const classColor = ` ${color ? `infn-btn-${color}` : "infn-btn-primary"}`;
  return (
    <button
      className={`infn-btn ${classColor} ${className}`}
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="d-flex d-justify-center w-100">
        {icon ? (
          <div className="me-2 my-auto" style={{ width: "24px" }}>
            {icon}
          </div>
        ) : null}
        {children}
      </div>
    </button>
  );
};

import React from "react";

export type ButtonColor =
  | "primary"
  | "primary-outline"
  | "secondary"
  | "secondary-outline"
  | "danger"
  | "danger-outline"
  | "danger"
  | "danger-outline";

export interface ButtonProps {
  type?: "button" | "reset" | "submit";
  color?: ButtonColor;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { type, className, children, color, icon, disabled, onClick } = props;
  return (
    <div className={className}>
      <button
        className={`infn-btn ${color ?? "infn-btn-primary"}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="d-flex d-justify-center w-100">
          {icon ? <div className="w-5 mr-4 my-auto">{icon}</div> : null}
          {children}
        </div>
      </button>
    </div>
  );
};

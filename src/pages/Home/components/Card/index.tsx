import React from "react";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { title, children, footer } = props;
  return (
    <div className="infn-card">
      <div className="infn-card-title">{title}</div>
      <div className="infn-card-body">{children}</div>
      <div className="infn-card-footer">{footer}</div>
    </div>
  );
};

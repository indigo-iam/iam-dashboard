import React from "react";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { title, children, footer } = props;
  return (
    <div className="infn-card">
      <div className="infn-title text-center mb-2">{title}</div>
      {children}
      <div>{footer}</div>
    </div>
  );
};

import React from "react";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card(props: Readonly<CardProps>) {
  const { title, children, footer } = props;
  return (
    <div className="rounded-xl p-8 shadow-xl transition duration-300 hover:scale-105">
      <div className="border-b-2 pb-2 text-center text-lg font-bold uppercase">
        {title}
      </div>
      <div className="px-4 py-8 border-b-2">{children}</div>
      <div className="mt-8">{footer}</div>
    </div>
  );
}

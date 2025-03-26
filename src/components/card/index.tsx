// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import React from "react";

export interface CardProps {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card(props: Readonly<CardProps>) {
  const { title, children, footer } = props;
  return (
    <div className="rounded-xl p-8 shadow-xl">
      <div className="border-b-2 pb-2 text-center text-lg font-bold uppercase">
        {title}
      </div>
      <div className="border-b-2 px-4 py-8">{children}</div>
      <div className="mt-8">{footer}</div>
    </div>
  );
}

// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { useId } from "react";

import { LabelContext } from "../label/context";
import { DescriptionContext } from "../description/context";
import { FieldContext } from "./context";

type FieldProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  role?: "listitem";
};

export function Field(props: Readonly<FieldProps>) {
  const { className, children, role } = props;
  const fallbackInputId = useId();
  const inputId = props.id || fallbackInputId;
  const labelId = useId();
  const descriptionId = useId();

  return (
    <div className={className + " group"} role={role}>
      <FieldContext value={{ inputId }}>
        <LabelContext value={{ labelledBy: labelId }}>
          <DescriptionContext value={{ describedBy: descriptionId }}>
            {children}
          </DescriptionContext>
        </LabelContext>
      </FieldContext>
    </div>
  );
}

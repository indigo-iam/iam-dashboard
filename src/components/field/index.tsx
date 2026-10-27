// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useId } from "react";
import { LabelContext } from "../label/context";
import { DescriptionContext } from "../description/context";

type FieldProps = {
  className?: string;
  children?: React.ReactNode;
  role?: "listitem";
};

export function Field(props: Readonly<FieldProps>) {
  const { className, children, role } = props;
  const labelId = useId();
  const descriptionId = useId();
  return (
    <div className={className + " group"} role={role}>
      <LabelContext value={{ labelledBy: labelId }}>
        <DescriptionContext value={{ describedBy: descriptionId }}>
          {children}
        </DescriptionContext>
      </LabelContext>
    </div>
  );
}

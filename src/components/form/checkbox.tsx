// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type CheckboxProps = {
  name?: string;
  label?: string;
  defaultChecked?: boolean;
};

export function Checkbox(props: Readonly<CheckboxProps>) {
  const { name, defaultChecked, label } = props;
  return (
    <div className="mt-4 flex flex-row gap-1">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

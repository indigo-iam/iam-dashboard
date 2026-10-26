// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type FieldsetProps = React.HtmlHTMLAttributes<HTMLFieldSetElement>;

export function Fieldset(props: Readonly<FieldsetProps>) {
  return <fieldset {...props} />;
}

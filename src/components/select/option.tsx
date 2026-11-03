// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type OptionsProps = React.OptionHTMLAttributes<HTMLOptionElement>;

export function Option(props: Readonly<OptionsProps>) {
  return <option {...props} />;
}

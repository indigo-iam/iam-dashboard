// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type SectionProps = React.HTMLAttributes<HTMLElement>;

export function Section(props: Readonly<SectionProps>) {
  return <section {...props} />;
}

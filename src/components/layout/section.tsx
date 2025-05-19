// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type SectionProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Section(props: Readonly<SectionProps>) {
  const { children, title } = props;
  return (
    <section className="dark:bg-primary rounded-lg bg-gray-50 p-4 shadow-md">
      {title ? (
        <h2 className="border-b border-gray-300 pb-2">{title}</h2>
      ) : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

type SubsectionProps = {
  title?: string;
  children?: React.ReactNode;
};
export function Subsection(props: Readonly<SubsectionProps>) {
  const { title, children } = props;
  return (
    <section>
      <b>{title}</b>
      {children}
    </section>
  );
}

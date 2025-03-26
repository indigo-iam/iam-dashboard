// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type FormSectionProps = {
  htmlFor: string;
  title: string;
  children: React.ReactNode;
};

export default function FormSection(props: Readonly<FormSectionProps>) {
  const { htmlFor, title, children } = props;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-base font-bold">
        {title}
      </label>
      {children}
    </div>
  );
}

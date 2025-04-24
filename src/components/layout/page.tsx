// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Page(props: Readonly<PageProps>) {
  const { title, children } = props;

  return (
    <div className="mt-16 md:mt-0" id={title}>
      <h1 className="text-primary dark:bg-dark dark:text-secondary-50 fixed z-10 h-16 w-full border-b border-b-gray-300 bg-gray-100 p-4">
        {title ?? "Unknown Client"}
      </h1>
      <div className="relative top-16 p-4">{children}</div>
    </div>
  );
}

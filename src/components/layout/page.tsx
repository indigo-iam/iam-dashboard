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
      <h1 className="text-primary dark:bg-dark dark:text-secondary z-10 flex h-0 items-center border-b border-b-gray-300 bg-gray-100 p-0 opacity-0 md:h-16 md:p-4 md:opacity-100">
        {title}
      </h1>
      <div className="relative">{children}</div>
    </div>
  );
}

// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Container(props: Readonly<ContainerProps>) {
  const { children } = props;
  return (
    <div
      className={`space-y-4 p-4 xl:max-w-5xl xl:min-w-3xl${props.className ? ` ${props.className}` : ""}`}
    >
      {children}
    </div>
  );
}

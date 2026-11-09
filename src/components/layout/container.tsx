// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Container(props: Readonly<ContainerProps>) {
  const outerClassName = props.className ? ` ${props.className}` : "";
  return (
    <div
      {...props}
      className={"mx-auto w-full max-w-5xl space-y-4 p-4" + outerClassName}
    />
  );
}

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type ModalBodyProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ModalBody = (props: Readonly<ModalBodyProps>) => {
  const { className, children } = props;
  return <div className={className ?? "space-y-4 p-4"}>{children}</div>;
};

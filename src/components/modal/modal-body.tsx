// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

export const ModalBody = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <div className="space-y-4 p-4">{children}</div>;
};

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type PanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Panel(props: Readonly<PanelProps>) {
  const { children } = props;
  return (
    <div className="m-auto max-w-screen-lg space-y-6 px-4">{children}</div>
  );
}

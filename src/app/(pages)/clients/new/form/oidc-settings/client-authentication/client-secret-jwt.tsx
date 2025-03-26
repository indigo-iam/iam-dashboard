// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type ClientSecretJwtProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretJwt(props: Readonly<ClientSecretJwtProps>) {
  const { onStatusChange } = props;
  onStatusChange(true);
  return <p>Client Secret JWT here</p>;
}

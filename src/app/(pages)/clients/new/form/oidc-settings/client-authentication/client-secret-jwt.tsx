// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useEffect } from "react";

type ClientSecretJwtProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretJwt(props: Readonly<ClientSecretJwtProps>) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange(true), [onStatusChange]);
  return <p>Client Secret JWT here</p>;
}

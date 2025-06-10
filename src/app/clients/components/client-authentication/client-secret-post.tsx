// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useEffect } from "react";

type ClientSecretPostProps = {
  onStatusChange?: (status: boolean) => void;
};

export default function ClientSecretPost(
  props: Readonly<ClientSecretPostProps>
) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange?.(true), [onStatusChange]);
  return <p>Client Secret Post Here</p>;
}

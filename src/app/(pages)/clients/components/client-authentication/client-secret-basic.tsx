// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { useEffect } from "react";

type ClientSecretBasicProps = {
  onStatusChange?: (status: boolean) => void;
};

export default function ClientSecretBasic(
  props: Readonly<ClientSecretBasicProps>
) {
  const { onStatusChange } = props;
  useEffect(() => onStatusChange?.(true), [onStatusChange]);
  return <p>Client Secret Basic Here</p>;
}

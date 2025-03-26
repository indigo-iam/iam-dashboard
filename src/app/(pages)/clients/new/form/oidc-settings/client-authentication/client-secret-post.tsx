// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

type ClientSecretPostProps = {
  onStatusChange: (status: boolean) => void;
};

export default function ClientSecretPost(
  props: Readonly<ClientSecretPostProps>
) {
  const { onStatusChange } = props;
  onStatusChange(true);
  return <p>Client Secret Post Here</p>;
}

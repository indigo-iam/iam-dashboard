// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ActiveToken } from "@/models/sites";

type RevokeTokenProps = {
  token: ActiveToken;
  show: boolean;
  onClose: () => void;
};

export function RevokeToken(props: Readonly<RevokeTokenProps>) {
  const { token, show, onClose } = props;
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke"
      title="Revoke Access Token"
    >
      <p>Are you sure you want to revoke the following token?</p>
      <p>{token.id}</p>
    </ConfirmModal>
  );
}

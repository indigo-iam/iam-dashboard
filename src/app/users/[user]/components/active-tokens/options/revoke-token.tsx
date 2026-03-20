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
  const tokenStr = `${token.value?.slice(0, 8)}...${token.value?.slice(-12)}`;
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke"
      title="Revoke Access Token"
      danger
    >
      <p>
        Are you sure you want to revoke the token{" "}
        <span className="font-mono break-all">{tokenStr}</span> for client{" "}
        <i>{token.clientId}</i>?
      </p>
    </ConfirmModal>
  );
}

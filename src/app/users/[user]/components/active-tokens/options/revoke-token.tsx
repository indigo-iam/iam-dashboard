// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { ActiveToken } from "@/models/sites";
import Link from "next/link";

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
      title="Revoke access token?"
      danger
    >
      <p className="text-center">
        Are you sure you want to revoke the access token for the client{" "}
        <Link
          className="font-semibold text-sky-600 hover:underline"
          href={`/clients/${token.clientId}`}
        >
          {token.clientId}
        </Link>{" "}
        ?
      </p>
    </ConfirmModal>
  );
}

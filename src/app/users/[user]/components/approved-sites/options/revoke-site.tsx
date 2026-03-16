// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Site } from "@/models/sites";
import { revokeSite } from "@/services/sites";

type RevokeSiteProps = {
  site: Site;
  show: boolean;
  onClose: () => void;
};

export function RevokeSite(props: Readonly<RevokeSiteProps>) {
  const { site, show, onClose } = props;
  const action = async () => {
    revokeSite(site.id.toString());
  };
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Revoke Site"
      confirmButtonText="Revoke"
      onConfirm={action}
      danger
    >
      <p>Are you sure you want to revoke the following token?</p>
      <p>{site.id}</p>
    </ConfirmModal>
  );
}

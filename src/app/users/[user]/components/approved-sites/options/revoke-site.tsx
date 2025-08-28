// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Site } from "@/models/sites";

type RevokeSiteProps = {
  site: Site;
  show: boolean;
  onClose: () => void;
};

export function RevokeSite(props: Readonly<RevokeSiteProps>) {
  const { site, show, onClose } = props;
  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      confirmButtonText="Revoke"
      title="Revoke Site"
    >
      <p>Are you sure you want to revoke the following token?</p>
      <p>{site.id}</p>
    </ConfirmModal>
  );
}

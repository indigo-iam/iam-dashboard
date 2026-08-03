// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import ConfirmModal from "@/components/confirm-modal";
import { Notice } from "@/components/notices";
import { toast } from "@/components/toaster";
import { Site } from "@/models/sites";
import { revokeSite } from "@/services/sites";

type RevokeSiteProps = {
  site: Site;
  show: boolean;
  onClose: () => void;
};

export function RevokeSite(props: Readonly<RevokeSiteProps>) {
  const { site, show, onClose } = props;

  async function action() {
    const res = await revokeSite(site.id.toString());
    toast.toast(res);
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      title="Revoke consent for site"
      confirmButtonText="Revoke"
      onConfirm={action}
      danger
    >
      <div className="space-y-4">
        <p>
          Are you sure you want to revoke the consent for the following site?
        </p>
        <Notice>
          <p>
            <b>{site.clientName}</b>
          </p>
          {site.clientDescription && (
            <p className="text-sm">{site.clientDescription}</p>
          )}
        </Notice>
      </div>
    </ConfirmModal>
  );
}

// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import ConfirmModal from "@/components/confirm-modal";
import { ModalProps } from "@/components/modal";
import { Warning } from "@/components/notices";
import { useProgressBar } from "@/components/progress-bar";
import { toast } from "@/components/toaster";
import { Certificate } from "@/models/indigo-user";
import { unlinkCertificate } from "@/services/users";

type UnlinkCertificateModalProps = ModalProps & {
  userId: string;
  userFormattedName: string;
  certificate: Certificate;
};

export function UnlinkCertificateModal(
  props: Readonly<UnlinkCertificateModalProps>
) {
  const { show, onClose, userId, userFormattedName, certificate } = props;
  const { startTransition } = useProgressBar();

  function handleConfirm() {
    startTransition(async () => {
      const res = await unlinkCertificate(userId, certificate);
      if (res) {
        toast.toast(res);
      }
    });
  }

  return (
    <ConfirmModal
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Unlink X509 certificate?"
    >
      <p className="text-center">
        Are you sure to unlink the following certificate?
      </p>
      <div className="flex grow flex-col items-center">
        <div>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              label
            </span>{" "}
            {certificate.display}
          </p>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              subject DN
            </span>{" "}
            {certificate.subjectDn}
          </p>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              issuer DN
            </span>{" "}
            {certificate.issuerDn}
          </p>
        </div>
      </div>
      <Warning>
        Login with the above certificate will NOT be possibile for user{" "}
        <b>{userFormattedName}</b> if you proceed.
      </Warning>
    </ConfirmModal>
  );
}

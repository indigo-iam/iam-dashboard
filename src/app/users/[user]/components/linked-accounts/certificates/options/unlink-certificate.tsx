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
  certificate: Certificate;
};

export function UnlinkCertificateModal(
  props: Readonly<UnlinkCertificateModalProps>
) {
  const { show, onClose, userId, certificate } = props;
  const { startTransition } = useProgressBar();

  const createdAt = (() => {
    if (!certificate.created) {
      return "N/A";
    }
    const d = new Date(certificate.created);
    return d.toLocaleString();
  })();

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
              Name
            </span>{" "}
            {certificate.display}
          </p>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              Subject DN
            </span>{" "}
            {certificate.subjectDn}
          </p>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              Issuer DN
            </span>{" "}
            {certificate.issuerDn}
          </p>
          <p>
            <span className="inline-block min-w-18 text-end text-xs font-light text-gray-500 dark:text-gray-300">
              Created
            </span>{" "}
            {createdAt}
          </p>
        </div>
      </div>
      <Warning>
        Login with the above certificate will NOT be allowed if you proceed.
      </Warning>
    </ConfirmModal>
  );
}

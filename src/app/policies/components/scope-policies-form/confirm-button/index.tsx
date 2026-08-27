// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import ConfirmModal from "@/components/confirm-modal";
import { useState } from "react";

type ConfirmButtonProps = {
    label: string; 
    title: string;
    confirmButtonText?: string;
    confirmButtonDisabled?: boolean;
    onConfirm: () => void | Promise<void>;
    children: React.ReactNode;
};

export default function ConfirmButton(props: Readonly<ConfirmButtonProps>) {
    const { label, title, confirmButtonText, confirmButtonDisabled, onConfirm, children } = props;
    const [show, setShow] = useState(false);
    const open = () => setShow(true);
    const close = () => setShow(false);

    const action = async () => {
        await onConfirm();
        close();
    };

    return (
        <div className="flex justify-end">
            <Button className="btn-primary" onClick={open} disabled={confirmButtonDisabled}>
                {label}
            </Button>
            <ConfirmModal
                show={show}
                onClose={close}
                onConfirm={action}
                title={title}
                confirmButtonText={confirmButtonText}
                confirmButtonDisabled={confirmButtonDisabled}
            >
                {children}
            </ConfirmModal>
        </div>
    )

}
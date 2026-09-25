// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "../buttons";
import { Tooltip, useTooltip } from "../tooltip";

export type ModalProps = {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export function Modal(props: Readonly<ModalProps>) {
  const { show, onClose, children } = props;
  const [domLoaded, setDomLoaded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // hack to create the portal only client side avoiding hydration errors
  useEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (domLoaded) {
      dialog?.addEventListener("keydown", handleEscape);
      backdrop?.addEventListener("mousedown", onClose);
    } else {
      (() => {
        setDomLoaded(true);
      })();
    }
    return () => {
      dialog?.addEventListener("keydown", handleEscape);
      backdrop?.removeEventListener("mousedown", onClose);
    };
  }, [domLoaded, handleEscape, onClose]);

  useEffect(() => {
    if (show && dialogRef.current && !dialogRef.current?.open) {
      dialogRef.current.show();
      document.getElementById("app")?.setAttribute("inert", "");
    } else if (!show && dialogRef.current?.open) {
      dialogRef.current.close();
      document.getElementById("app")?.removeAttribute("inert");
    }
  }, [show]);

  if (!domLoaded) {
    return;
  }

  return createPortal(
    <dialog
      className="fixed inset-0 z-30 h-full w-full space-y-4 bg-transparent opacity-0 transition-opacity transition-discrete duration-300 open:opacity-100 open:starting:opacity-0"
      ref={dialogRef}
      aria-modal={true}
    >
      <div
        className="justify flex h-full w-full items-center justify-center bg-gray-900/30 py-32 md:items-start"
        ref={backdropRef}
        tabIndex={-1}
      >
        <div className="overlay w-md space-y-4 p-8 xl:w-xl">{children}</div>
      </div>
    </dialog>,
    globalThis.document.body
  );
}

type ModalHeaderProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export function ModalHeader(props: Readonly<ModalHeaderProps>) {
  const { onClose, children } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { tooltipId, tooltipRef } = useTooltip(buttonRef);
  return (
    <div className="flex">
      <h2 className="grow">{children}</h2>
      <Button
        type="button"
        onClick={onClose}
        className="cursor-pointer"
        title="Close"
        ref={buttonRef}
        aria-labelledby={tooltipId}
      >
        <XMarkIcon className="size-6 rounded-full bg-gray-100 p-1 transition duration-200 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-300 dark:hover:text-gray-500" />
        <Tooltip tooltipId={tooltipId} tooltipRef={tooltipRef}>
          Close
        </Tooltip>
      </Button>
    </div>
  );
}

type ModalBodyProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ModalBody(props: Readonly<ModalBodyProps>) {
  const { className, children } = props;
  return <div className={className ?? "space-y-4 px-2 py-4"}>{children}</div>;
}

type ModalFooterProps = {
  children?: React.ReactNode;
};

export function ModalFooter(props: Readonly<ModalFooterProps>) {
  const { children } = props;
  return (
    <div className="bottom-0 flex min-h-8 justify-end space-x-2">
      {children}
    </div>
  );
}

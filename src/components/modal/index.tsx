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

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  // hack to create the portal only client side avoiding hydration errors
  useEffect(() => {
    const dialog = dialogRef.current;
    if (domLoaded) {
      dialog?.addEventListener("keydown", handleEscape);
      dialog?.addEventListener("mousedown", handleClick);
    } else {
      (() => {
        setDomLoaded(true);
        dialog?.close();
      })();
    }
    return () => {
      dialog?.addEventListener("keydown", handleEscape);
      dialog?.removeEventListener("mousedown", handleClick);
    };
  }, [domLoaded, handleEscape, handleClick]);

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
      className="fixed inset-0 top-8 z-30 h-full w-full flex-col items-center space-y-4 bg-gray-900/30 opacity-0 transition-opacity transition-discrete duration-300 open:flex open:opacity-100 md:top-0 md:justify-center open:starting:opacity-0"
      ref={dialogRef}
      aria-modal={true}
    >
      <div className="overlay w-md space-y-4 p-8 xl:w-xl">{children}</div>
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

// SPDX-FileCopyrightText: 2026 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef } from "react";

export type ModalProps = {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export function Modal(props: Readonly<ModalProps>) {
  const { show, onClose, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => {
    // wait for animation to end before closing
    dialogRef.current?.removeAttribute("data-open");
    setTimeout(() => {
      dialogRef.current?.close();
    }, 300);
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  const hitTest = useCallback(
    (event: MouseEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }
      const dialogRect = dialog.getBoundingClientRect();
      const isOutside =
        event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom;
      if (isOutside) {
        onClose();
      }
    },
    [onClose]
  );

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    dialogRef.current?.setAttribute("data-open", "");
    dialogRef.current?.addEventListener("mousedown", hitTest);
    dialogRef.current?.addEventListener("keydown", handleEscape);
  }, [hitTest, handleEscape]);

  const clearEventListeners = useCallback(() => {
    const dialog = dialogRef.current;
    dialog?.removeEventListener("mousedown", hitTest);
    dialog?.removeEventListener("keydown", handleEscape);
  }, [hitTest, handleEscape]);

  useEffect(() => {
    if (show && !dialogRef.current?.open) {
      open();
    } else if (!show && dialogRef.current?.open) {
      close();
    }
    return () => {
      clearEventListeners();
    };
  }, [show, open, close, clearEventListeners]);

  return (
    <dialog
      className="overlay m-auto w-md space-y-4 p-8 opacity-0 transition-all duration-300 backdrop:bg-gray-950/30 backdrop:opacity-0 backdrop:transition-all backdrop:duration-300 data-open:opacity-100 data-open:backdrop:opacity-100 xl:w-xl data-open:starting:opacity-0 backdrop:data-open:starting:opacity-0"
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
}

type ModalHeaderProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export function ModalHeader(props: Readonly<ModalHeaderProps>) {
  const { onClose, children } = props;
  return (
    <div className="flex">
      <h2 className="grow">{children}</h2>
      <button onClick={onClose} className="cursor-pointer" title="Close">
        <XMarkIcon className="size-6 rounded-full bg-gray-100 p-1 hover:bg-gray-200" />
      </button>
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

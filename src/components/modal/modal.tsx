// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ModalProps {
  title?: string;
  children?: ReactNode;
  show: boolean;
  onClose: () => void;
  "data-testid"?: string;
}

export function Modal(props: Readonly<ModalProps>) {
  const { title, children, show, onClose } = props;

  return (
    <Transition appear show={show}>
      <Dialog
        as="div"
        className="relative z-30 focus:outline-none"
        onClose={onClose}
        data-testid={props["data-testid"]}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="mt-38 flex min-h-32 justify-center p-4">
            <DialogPanel
              transition
              className="bg-secondary text-primary dark:text-secondary dark:bg-dark z-50 w-full max-w-xl space-y-4 rounded-2xl p-8 shadow-2xl duration-300 ease-out data-[closed]:transform-[scale-95] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="div"
                className="border-light-gray flex text-xl font-bold"
              >
                <h2>{title}</h2>
                <button
                  title="Close"
                  className="mr-0 ml-auto"
                  type="reset"
                  onClick={onClose}
                >
                  <div
                    className="dark:hover:text-secondary dark:text-secondary/60 dark:hover:bg-gray size-7 rounded-full bg-neutral-300 p-[3px] text-neutral-500 hover:bg-neutral-400 dark:bg-white/25"
                    aria-label="close"
                  >
                    <XMarkIcon />
                  </div>
                </button>
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

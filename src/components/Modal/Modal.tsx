"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ModalProps {
  title?: string;
  children?: ReactNode;
  show: boolean;
  onClose: () => void;
}

export function Modal(props: Readonly<ModalProps>) {
  const { title, children, show, onClose } = props;

  return (
    <Transition appear show={show}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="mt-16 flex min-h-32 justify-center p-4">
            {/* Backdrop */}
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <div
                className="z-25 fixed inset-0 bg-black/30"
                aria-hidden="true"
              />
            </TransitionChild>
            {/* Popup */}
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="z-50 w-full max-w-xl divide-y rounded-2xl bg-secondary p-4 text-primary shadow-lg dark:bg-white/10 dark:text-secondary dark:backdrop-blur-lg">
                <DialogTitle as="h2" className="pb-2 text-xl font-bold">
                  <div className="flex">
                    {title}
                    <button className="ml-auto mr-0" onClick={onClose}>
                      <div
                        className="w-6 rounded-full bg-neutral-300 p-[3px] text-neutral-500 hover:bg-neutral-400 dark:bg-white/25 dark:text-primary"
                        aria-label="close"
                      >
                        <XMarkIcon />
                      </div>
                    </button>
                  </div>
                </DialogTitle>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

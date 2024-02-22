import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";

export interface ModalProps {
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  show: boolean;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { title, body, footer, show, onClose } = props;

  const close = () => {
    onClose?.();
  };

  return (
    <div>
      <div className={`infn-modal ${show ? "show" : "hide"}`} onClick={close}>
        <div
          className={`infn-modal-content ${show ? "show" : "hide"}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="infn-modal-header">
            <div className="infn-subtitle">{title}</div>
            <button
              type="button"
              className="infn-btn-close"
              aria-label="Close"
              onClick={close}
            >
              <XMarkIcon style={{ width: "16px" }} />
            </button>
          </div>
          <div className="infn-modal-body">{body}</div>
          <div className="infn-modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

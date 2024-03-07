import { XMarkIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

export interface ModalProps {
  title?: string;
  children?: ReactNode;
  show: boolean;
  onClose?: () => void;
}

export const ModalBody = (props: { children?: ReactNode }) => {
  const { children } = props;
  return <div className="infn-modal-body">{children}</div>;
};

export const ModalFooter = (props: { children?: ReactNode }) => {
  const { children } = props;
  return <div className="infn-modal-footer">{children}</div>;
};

export const Modal = (props: ModalProps) => {
  const { title, show, children, onClose } = props;

  return (
    <div
      className={`infn-modal ${show ? "show" : "hide"}`}
      onClick={onClose}
      aria-hidden="true" // make sonarlint happy
    >
      <div
        className={`infn-modal-content ${show ? "show" : "hide"}`}
        onClick={e => e.stopPropagation()}
        aria-hidden="true" // make sonarlint happy
      >
        <div className="infn-modal-header">
          <div className="infn-subtitle">{title}</div>
          <button
            type="button"
            className="infn-btn-close"
            aria-label="Close"
            onClick={onClose}
          >
            <XMarkIcon style={{ width: "16px" }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

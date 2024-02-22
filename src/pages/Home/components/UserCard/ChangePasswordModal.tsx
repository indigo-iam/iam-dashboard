import { Button, Modal } from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export const ChangePasswordModal = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;

  const Body = () => {
    return (
      <div className="my-auto">
        <div className="container">
          <div className="row p-2">
            <div className="infn-section-subtitle col my-auto">
              Current Password
            </div>
            <input className="infn-input-search col"></input>
          </div>
          <div className="row p-2">
            <div className="infn-section-subtitle col my-auto">
              New Password
            </div>
            <input className="infn-input-search col"></input>
          </div>
          <div className="row p-2">
            <div className="infn-section-subtitle col my-auto">
              Repeat New Password
            </div>
            <input className="infn-input-search col"></input>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="d-flex justify-content-end p-2">
        <div className="row">
          <div className="col p-1">
            <Button
              className="my-auto"
              color="primary"
              icon={<ArrowUpTrayIcon />}
            >
              Update Password
            </Button>
          </div>
          <div className="col p-1">
            <Button
              className="my-auto"
              color="warning"
              icon={<ArrowUturnLeftIcon />}
            >
              Reset
            </Button>
          </div>
          <div className="col p-1">
            <Button className="my-auto" color="danger" icon={<XMarkIcon />}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Change Password"
      body={<Body />}
      footer={<Footer />}
    />
  );
};

import { Button, Modal, Form, Input } from "@components";
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
      <Form>
        <Input type="password" id="current-password" title="Current Password" />
        <Input type="password" id="new-password" title="New Password" />
        <Input type="password" id="repeat-password" title="Repeat Password" />
      </Form>
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
            <Button
              className="my-auto"
              color="danger"
              onClick={onClose}
              icon={<XMarkIcon />}
            >
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

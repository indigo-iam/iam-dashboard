import { Button, Modal, Form, Input } from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const EditDetailsModal = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;
  const Body = () => {
    return (
      <Form>
        <Input type="search" id="name" title="Name" />
        <Input type="search" id="surname" title="Surname" />
        <Input type="email" id="email" title="Email" />
        <Input type="search" id="username" title="Username" />
        <Input type="search" id="picture" title="Picture" />
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
      title="Edit Details"
      body={<Body />}
      footer={<Footer />}
    />
  );
};

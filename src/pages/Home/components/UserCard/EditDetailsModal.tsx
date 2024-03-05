import { Button, Modal, Form, Input } from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMe } from "@services/Me";

const Body = () => {
  const { me } = useMe();
  return (
    <Form>
      <Input
        type="search"
        id="name"
        title="Name"
        placeholder={me?.name.givenName}
      />
      <Input
        type="search"
        id="surname"
        title="Surname"
        placeholder={me?.name.familyName}
      />
      <Input type="search" id="middle-name" title="Middle Name" />
      <Input
        type="email"
        id="email"
        title="Email"
        placeholder={me?.emails[0].value}
      />
      <Input
        type="search"
        id="username"
        title="Username"
        placeholder={me?.userName}
      />
    </Form>
  );
};

const Footer = (props: { onClose: () => void }) => {
  const { onClose } = props;
  return (
    <div className="d-flex justify-content-end p-2">
      <div className="row">
        <div className="col p-1">
          <Button
            className="my-auto"
            color="primary"
            icon={<ArrowUpTrayIcon />}
          >
            Update
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

export const EditDetailsModal = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Details"
      body={<Body />}
      footer={<Footer onClose={onClose} />}
    />
  );
};

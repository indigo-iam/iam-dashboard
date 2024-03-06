import {
  Button,
  Modal,
  Form,
  Input,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMe } from "@services/Me";

const Body = () => {
  const { me } = useMe();
  return (
    <ModalBody>
      <Input
        type="search"
        id="name"
        title="Name"
        name="name"
        placeholder={me?.name.givenName}
      />
      <Input
        type="search"
        id="surname"
        title="Surname"
        name="surname"
        placeholder={me?.name.familyName}
      />
      <Input type="search" id="middle-name" title="Middle Name" />
      <Input
        type="email"
        id="email"
        title="Email"
        name="email"
        placeholder={me?.emails[0].value}
      />
      <Input
        type="search"
        id="username"
        title="Username"
        name="username"
        placeholder={me?.userName}
        disabled={true}
      />
    </ModalBody>
  );
};

const Footer = (props: { onClose?: () => void }) => {
  const { onClose } = props;
  return (
    <ModalFooter>
      <div className="d-flex justify-content-end p-2">
        <div className="row">
          <div className="col p-1">
            <Button
              className="my-auto"
              color="primary"
              icon={<ArrowUpTrayIcon />}
              type="submit"
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
    </ModalFooter>
  );
};

const EditDetailsForm = (props: { onClose?: () => void }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body />
      <Footer {...props} />
    </Form>
  );
};

export const EditDetailsModal = (props: ModalProps) => {
  const { onClose } = props;
  return (
    <Modal {...props}>
      <EditDetailsForm onClose={onClose} />
    </Modal>
  );
};

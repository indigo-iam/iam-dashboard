import {
  Button,
  Modal,
  Form,
  Input,
  ModalProps,
  ModalBody,
  ModalFooter,
} from "@components";
import {
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const Body = () => {
  return (
    <ModalBody>
      <Input type="password" id="current-password" title="Current Password" />
      <Input type="password" id="new-password" title="New Password" />
      <Input type="password" id="repeat-password" title="Repeat Password" />
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
    </ModalFooter>
  );
};

export const ChangePasswordModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <Form>
        <Body />
        <Footer onClose={props.onClose} />
      </Form>
    </Modal>
  );
};

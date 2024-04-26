import { Button, Modal, ModalBody, ModalFooter } from "@components";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Body = () => {
  return (
    <ModalBody>
      <p>
        Sign in with an external identity provider to link such identity to your{" "}
        <strong>infn-cloud</strong> account.
      </p>
    </ModalBody>
  );
};

const Footer = (props: { onClose: () => void }) => {
  const { onClose } = props;
  return (
    <ModalFooter>
      <div className="d-flex justify-content-end p-2">
        <div className="row">
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

export const LinkExternalAccount = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;
  return (
    <Modal show={show} onClose={onClose} title="Link external account?">
      <Body />
      <Footer onClose={onClose} />
    </Modal>
  );
};

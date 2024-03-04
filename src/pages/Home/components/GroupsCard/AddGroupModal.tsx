import { Button, Modal } from "@components";
import { XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const Body = () => {
  return (
    <div>
      <p>
        <b>Select one or more groups</b>
      </p>
      <p>
        Only one groups that user is not already a member will be shown.
        <br />
        Type more characters to refine the group search.
      </p>
      <div>
        <input
          type="search"
          className="infn-input-search"
          placeholder="Type in the group name or press enter..."
        />
      </div>
    </div>
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
            Add group(s)
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

export const AddGroupModal = (props: {
  show: boolean;
  onClose: () => void;
}) => {
  const { show, onClose } = props;
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Add Group"
      body={<Body />}
      footer={<Footer onClose={onClose} />}
    />
  );
};

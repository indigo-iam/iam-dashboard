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
      <form className="row">
        <div className="row">
          <label className="col-4 my-auto" htmlFor="current-password">
            Current Password
          </label>
          <input
            className="infn-input-search col"
            type="search"
            name="current-password"
            id="current-password"
          />
        </div>
        <div className="row gy-2">
          <label className="col-4 my-auto" htmlFor="new-password">
            New Password
          </label>
          <input
            className="infn-input-search col"
            type="search"
            name="new-password"
            id="new-password"
          />
        </div>
        <div className="row gy-2">
          <label className="col-4 my-auto" htmlFor="repeat-password">
            Repeat New Password
          </label>
          <input
            className="infn-input-search col"
            type="search"
            name="repeat-password"
            id="repeat-password"
          />
        </div>
      </form>
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

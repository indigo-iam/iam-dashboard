import { Button, Modal } from "@components";
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
      <form className="row">
        <div className="row">
          <label className="col-3 my-auto" htmlFor="name">
            Name
          </label>
          <input
            className="col infn-input-search"
            type="search"
            name="name"
            id="name"
          />
        </div>
        <div className="row gy-2">
          <label className="col-3 my-auto" htmlFor="surname">
            Surname
          </label>
          <input
            className="col infn-input-search"
            type="search"
            name="surname"
            id="surname"
          />
        </div>
        <div className="row gy-2">
          <label className="col-3 my-auto" htmlFor="email">
            Email
          </label>
          <input
            className="col infn-input-search"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="row gy-2">
          <label className="col-3 my-auto" htmlFor="username">
            Username
          </label>
          <input
            className="col infn-input-search"
            type="search"
            name="username"
            id="username"
          />
        </div>
        <div className="row gy-2">
          <label className="col-3 my-auto" htmlFor="picture">
            Picture
          </label>
          <input
            className="col infn-input-search"
            type="search"
            name="picture"
            id="picture"
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
      title="Edit Details"
      body={<Body />}
      footer={<Footer />}
    />
  );
};

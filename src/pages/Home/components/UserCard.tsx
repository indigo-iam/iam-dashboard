import { useState } from "react";
import { Button, Modal } from "../../../components";
import { IamUser } from "../../../services/IAM";
import { useIam } from "../../../services/IAM";
import { Card } from "./Card";

import {
  PencilIcon,
  KeyIcon,
  ArrowUpTrayIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

const ChangePasswordModal = (props: { show: boolean; onClose: () => void }) => {
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
        <div className="p-1">
          <Button
            className="my-auto"
            color="primary"
            icon={<ArrowUpTrayIcon />}
          >
            Update Password
          </Button>
        </div>
        <div className="p-1">
          <Button
            className="my-auto"
            color="warning"
            icon={<ArrowUturnLeftIcon />}
          >
            Reset
          </Button>
        </div>
        <div className="p-1">
          <Button className="my-auto" color="danger" icon={<XMarkIcon />}>
            Cancel
          </Button>
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

const Footer = (props: { onClickChangePassword: () => void }) => {
  const { onClickChangePassword } = props;
  return (
    <div className="container justify-content-center mt-4">
      <div className="row align-items-center">
        <div className="col">
          <Button className="mx-auto" icon={<PencilIcon />}>
            Edit Details
          </Button>
        </div>
        <div className="col">
          <Button
            className="mx-auto"
            icon={<KeyIcon />}
            color="success"
            onClick={onClickChangePassword}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export const UserCard = (): JSX.Element => {
  const iam = useIam();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  if (!iam.user) {
    return <></>;
  }

  const User = (props: { user: IamUser }) => {
    const { user } = props;
    const data = [
      ["User Id", user.id],
      ["Email", user.emails[0].value],
      ["Status", user.active ? "active" : "disabled"],
      ["Created", user.meta.created ?? "N/A"],
      ["Last Modified", user.meta.lastModified ?? "N/A"],
    ];

    const Row = (props: { data: string[] }) => {
      return (
        <tr>
          <td>
            <b>{props.data[0]}</b>
          </td>
          <td className="text-end">{props.data[1]}</td>
        </tr>
      );
    };

    return (
      <table className="w-100">
        <tbody>
          {data.map(row => (
            <Row key={row[0]} data={row} />
          ))}
        </tbody>
      </table>
    );
  };

  const showChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const hideChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div>
      <ChangePasswordModal
        show={showChangePasswordModal}
        onClose={hideChangePassword}
      />
      <Card
        title={iam.user.name.formatted}
        footer={<Footer onClickChangePassword={showChangePassword} />}
      >
        <User user={iam.user} />
      </Card>
    </div>
  );
};

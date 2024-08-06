"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { dateToHuman } from "@/utils/dates";
import { EditDetailsModal } from "./EditDetailsModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { PencilIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import type { Me } from "@/models/me";

const Footer = (props: {
  onClickEditDetails: () => void;
  onClickChangePassword: () => void;
}) => {
  const { onClickEditDetails, onClickChangePassword } = props;
  return (
    <div className="mt-3 flex space-x-2">
      <Button icon={<PencilIcon />} onClick={onClickEditDetails}>
        Edit Details
      </Button>
      <Button
        icon={<KeyIcon />}
        action="success"
        onClick={onClickChangePassword}
      >
        Change Password
      </Button>
    </div>
  );
};

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

const User = (props: { me: Me }) => {
  const { me } = props;
  const created = me.meta?.created
    ? dateToHuman(new Date(me.meta?.created))
    : "N/A";
  const lastModified = me.meta?.lastModified
    ? dateToHuman(new Date(me.meta?.lastModified))
    : "N/A";

  const data = [
    ["User Name", me.userName ?? "Unknown username"],
    ["User Id", me.id ?? "N/A"],
    ["Email", me.emails?.[0].value ?? "N/A"],
    ["Status", me.active ? "active" : "disabled"],
    ["Created", created],
    ["Last Modified", lastModified],
  ];

  return (
    <table className="w-full">
      <tbody>
        {data.map(row => (
          <Row key={row[0]} data={row} />
        ))}
      </tbody>
    </table>
  );
};

export const UserCard = (props: { me: Me }) => {
  const { me } = props;
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div>
      <EditDetailsModal
        show={showEditDetails}
        onClose={() => setShowEditDetails(false)}
        me={me}
        title="Edit your details"
      />
      <ChangePasswordModal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
      <Card
        title={me?.name?.formatted}
        footer={
          <Footer
            onClickEditDetails={() => setShowEditDetails(true)}
            onClickChangePassword={() => setShowChangePassword(true)}
          />
        }
      >
        <User me={me} />
      </Card>
    </div>
  );
};

"use client";
import { Button } from "@/components";
import { dateToHuman } from "@/utils/dates";
import { Card } from "../Card";
import { EditDetailsModal } from "./EditDetailsModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { PencilIcon, KeyIcon } from "@heroicons/react/24/solid";
import { reducer, initialState } from "./reducer";
import { useReducer } from "react";
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
  const created = me.meta.created
    ? dateToHuman(new Date(me.meta.created))
    : "N/A";
  const lastModified = me.meta.lastModified
    ? dateToHuman(new Date(me.meta.lastModified))
    : "N/A";

  const data = [
    ["User Name", me.userName],
    ["User Id", me.id],
    ["Email", me.emails[0].value],
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const showEditDetails = () => {
    dispatch({ type: "SHOW_EDIT_DETAILS" });
  };

  const hideEditDetails = () => {
    dispatch({ type: "HIDE_EDIT_DETAILS" });
  };

  const showChangePassword = () => {
    dispatch({ type: "SHOW_CHANGE_PASSWORD" });
  };

  const hideChangePassword = () => {
    dispatch({ type: "HIDE_CHANGE_PASSWORD" });
  };

  return (
    <div>
      <EditDetailsModal
        show={state.showEditDetails}
        onClose={hideEditDetails}
        me={me}
      />
      <ChangePasswordModal
        show={state.showChangePassword}
        onClose={hideChangePassword}
      />
      <Card
        title={me?.name.formatted}
        footer={
          <Footer
            onClickEditDetails={showEditDetails}
            onClickChangePassword={showChangePassword}
          />
        }
      >
        <User me={me} />
      </Card>
    </div>
  );
};

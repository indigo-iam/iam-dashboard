import { Button } from "@components";
import { useIam, IamUser } from "@services/IAM";
import { Card } from "../Card";
import { EditDetailsModal } from "./EditDetailsModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { PencilIcon, KeyIcon } from "@heroicons/react/24/solid";
import { reducer, initialState } from "./reducer";
import { useReducer } from "react";

const Footer = (props: {
  onClickEditDetails: () => void;
  onClickChangePassword: () => void;
}) => {
  const { onClickEditDetails, onClickChangePassword } = props;
  return (
    <div className="d-flex mt-3">
      <Button icon={<PencilIcon />} onClick={onClickEditDetails}>
        Edit Details
      </Button>
      <div style={{ width: "8px" }} />
      <Button
        icon={<KeyIcon />}
        color="success"
        onClick={onClickChangePassword}
      >
        Change Password
      </Button>
    </div>
  );
};

export const UserCard = (): JSX.Element => {
  const iam = useIam();
  const [state, dispatch] = useReducer(reducer, initialState);

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
      />
      <ChangePasswordModal
        show={state.showChangePassword}
        onClose={hideChangePassword}
      />
      <Card
        title={iam.user.name.formatted}
        footer={
          <Footer
            onClickEditDetails={showEditDetails}
            onClickChangePassword={showChangePassword}
          />
        }
      >
        <User user={iam.user} />
      </Card>
    </div>
  );
};

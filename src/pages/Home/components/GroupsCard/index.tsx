import { useState } from "react";
import { Button } from "@components";
import { IamUser, useIam } from "@services/IAM";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Card } from "../Card";
import { AddGroupModal } from "./AddGroupModal";

const Groups = (props: { user?: IamUser; deleteGroup: () => void }) => {
  const { user, deleteGroup } = props;
  if (!user) {
    return null;
  }
  const { groups } = user;
  if (!groups) {
    return <p>No groups found</p>;
  }

  const Row = (props: { title: string }) => {
    return (
      <tr>
        <td>
          <b>{props.title}</b>
        </td>
        <td className="d-flex flex-row-reverse">
          <Button
            color="danger"
            small={true}
            onClick={deleteGroup}
            icon={<XCircleIcon />}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table>
        <tbody>
          {groups.map(group => {
            return <Row key={group.display} title={group.display} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export const GroupsCard = (): JSX.Element => {
  const iam = useIam();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const showAddGroup = () => {
    setShowAddGroupModal(true);
  };

  const hideAddGroup = () => {
    console.log("hello?")
    setShowAddGroupModal(false);
  };

  const Footer = () => {
    return (
      <div>
        <Button icon={<UserPlusIcon />} color="success" onClick={showAddGroup}>
          Add Group
        </Button>
      </div>
    );
  };

  return (
    <div>
      <AddGroupModal show={showAddGroupModal} onClose={hideAddGroup} />
      <Card title="Groups" footer={<Footer />}>
        <Groups
          user={iam.user}
          deleteGroup={() => console.log("delete group")}
        />
      </Card>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@components";
import { IamUser, useIam } from "@services/IAM";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Card } from "../Card";
import { AddGroupModal } from "./AddGroupModal";

const Row = (props: { title: string; deleteGroup: () => void }) => {
  const { title, deleteGroup } = props;
  return (
    <tr>
      <td>
        <b>{title}</b>
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

const Groups = (props: { user?: IamUser; deleteGroup: () => void }) => {
  const { user, deleteGroup } = props;
  if (!user) {
    return null;
  }
  const { groups } = user;
  if (!groups) {
    return <p>No groups found</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          {groups.map(group => {
            return (
              <Row
                key={group.display}
                title={group.display}
                deleteGroup={deleteGroup}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Footer = (props: { showAddGroup: () => void }) => {
  const { showAddGroup } = props;
  return (
    <Button icon={<UserPlusIcon />} color="success" onClick={showAddGroup}>
      Add Group
    </Button>
  );
};

export const GroupsCard = (): JSX.Element => {
  const iam = useIam();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const showAddGroup = () => {
    setShowAddGroupModal(true);
  };

  const hideAddGroup = () => {
    setShowAddGroupModal(false);
  };

  return (
    <div>
      <AddGroupModal show={showAddGroupModal} onClose={hideAddGroup} />
      <Card title="Groups" footer={<Footer showAddGroup={showAddGroup} />}>
        <Groups
          user={iam.user}
          deleteGroup={() => console.log("delete group")}
        />
      </Card>
    </div>
  );
};

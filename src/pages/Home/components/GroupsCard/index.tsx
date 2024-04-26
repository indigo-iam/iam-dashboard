import { useState } from "react";
import { Button } from "@components";
import { useMe } from "@services/Me";
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
          isSmall={true}
          onClick={deleteGroup}
          icon={<XCircleIcon />}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

const Groups = () => {
  const { me } = useMe();
  if (!me) {
    return null;
  }
  const { groups } = me;
  if (!groups) {
    return <p>No groups found</p>;
  }
  const deleteGroup = () => console.log("fake delete group!");
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
      Add to group
    </Button>
  );
};

export const GroupsCard = (): JSX.Element => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const showAddGroup = () => {
    setShowAddGroupModal(true);
  };

  const hideAddGroup = () => {
    setShowAddGroupModal(false);
  };

  return (
    <>
      <AddGroupModal show={showAddGroupModal} onClose={hideAddGroup} />
      <Card title="Groups" footer={<Footer showAddGroup={showAddGroup} />}>
        <Groups />
      </Card>
    </>
  );
};

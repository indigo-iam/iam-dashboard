"use client";
import { Button } from "@/components";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { Card } from "../Card";
import { AddGroupModal } from "./AddGroupModal";
import { Me } from "@/models/Me";
import { useState } from "react";
import { Group } from "@/models/Groups";

const Row = (props: { title: string; deleteGroup: () => void }) => {
  const { title, deleteGroup } = props;
  return (
    <tr>
      <td>
        <b>{title}</b>
      </td>
      <td className="flex flex-row-reverse">
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

const Groups = (props: { me: Me }) => {
  const { groups } = props.me;
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
      Add Group
    </Button>
  );
};

export const GroupsCard = (props: { me: Me; groups: Group[] }): JSX.Element => {
  const { me, groups } = props;
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const showAddGroup = () => {
    setShowAddGroupModal(true);
  };

  const hideAddGroup = () => {
    setShowAddGroupModal(false);
  };
  const modalTitle = `Add user ${me.name.formatted} to group(s)?`;

  return (
    <div>
      <AddGroupModal
        groups={groups}
        show={showAddGroupModal}
        onClose={hideAddGroup}
        title={modalTitle}
      />
      <Card title="Groups" footer={<Footer showAddGroup={showAddGroup} />}>
        <Groups me={me} />
      </Card>
    </div>
  );
};

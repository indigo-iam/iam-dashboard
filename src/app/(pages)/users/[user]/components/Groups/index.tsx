"use client";
import { Button } from "@/components/Buttons";
// import { UserPlusIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/16/solid";
// import { AddGroupModal } from "./AddGroupModal";
// import { useState } from "react";
// import { Group } from "@/models/groups";
import { ScimReference, ScimUser } from "@/models/scim";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@/components/Table";
import Link from "next/link";

const Row = (props: { group: ScimReference; deleteGroup: () => void }) => {
  const { group, deleteGroup } = props;
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`/groups/${group.value}`}
          className="text-primary-600 underline"
        >
          {group.display}
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <Button
          action="danger"
          isSmall={true}
          onClick={deleteGroup}
          icon={<XCircleIcon />}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

const GroupsTable = (props: { user: ScimUser }) => {
  const { user } = props;
  const { groups } = user;
  if (!groups) {
    return <p>No groups found</p>;
  }
  const deleteGroup = () => console.log("fake delete group!");
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Group</TableHeaderCell>
        <TableHeaderCell className="text-right">Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {groups.map(group => {
          return (
            <Row key={group.value} group={group} deleteGroup={deleteGroup} />
          );
        })}
      </TableBody>
    </Table>
  );
};

// const Footer = (props: { showAddGroup: () => void }) => {
//   const { showAddGroup } = props;
//   return (
//     <Button icon={<UserPlusIcon />} action="success" onClick={showAddGroup}>
//       Add to Group(s)
//     </Button>
//   );
// };

export const Groups = (props: { user: ScimUser }): JSX.Element => {
  const { user } = props;
  // const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  // const modalTitle = `Add user ${user.name?.formatted} to group(s)?`;

  // const showAddGroup = () => {
  //   setShowAddGroupModal(true);
  // };

  // const hideAddGroup = () => {
  //   setShowAddGroupModal(false);
  // };

  return (
    <>
      {/* <AddGroupModal
        user={user}
        groups={groups}
        show={showAddGroupModal}
        onClose={hideAddGroup}
        title={modalTitle}
      /> */}
      <GroupsTable user={user} />
    </>
  );
};

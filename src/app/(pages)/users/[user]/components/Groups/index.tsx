import { ScimUser } from "@/models/scim";
import GroupsTable from "./Table";
// import { AddGroupModal } from "./AddGroupModal";
// import { useState } from "react";
// import { Group } from "@/models/groups";

// const Footer = (props: { showAddGroup: () => void }) => {
//   const { showAddGroup } = props;
//   return (
//     <Button icon={<UserPlusIcon />} action="success" onClick={showAddGroup}>
//       Add to Group(s)
//     </Button>
//   );
// };

type GroupsProps = {
  user: ScimUser;
};

export const Groups = (props: Readonly<GroupsProps>): JSX.Element => {
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

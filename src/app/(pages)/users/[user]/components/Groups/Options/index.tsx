"use client";
import Options from "@/components/Options";
import RemoveMembership, { RemoveMembershipProps } from "./RemoveMembership";

interface GroupOptionsProps extends RemoveMembershipProps {}

export default function GroupOptions(props: Readonly<GroupOptionsProps>) {
  return (
    <Options>
      <RemoveMembership
        userRef={props.userRef}
        groupId={props.groupId}
        groupName={props.groupName}
      />
    </Options>
  );
}

"use client";
import Options from "@/components/options";
import RemoveMembership, { RemoveMembershipProps } from "./remove-membership";

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

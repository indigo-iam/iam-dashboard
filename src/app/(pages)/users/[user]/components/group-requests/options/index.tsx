// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import DeleteGroupRequestButton from "./delete-button";
import { User } from "@/models/scim";
import { GroupRequest } from "@/models/group-requests";

type GroupRequestOptionsProps = {
  user: User;
  isMe: boolean;
  groupRequest: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { user, isMe, groupRequest } = props;
  return (
    <Options>
      <DeleteGroupRequestButton
        user={user}
        isMe={isMe}
        groupRequest={groupRequest}
      />
    </Options>
  );
}

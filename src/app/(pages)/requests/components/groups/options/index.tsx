// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { GroupRequest } from "@/models/group-requests";
import ConfirmButton from "./confirm-button";
import RejectButton from "./reject-button";

type GroupRequestOptionsProps = {
  request: GroupRequest;
};

export default function GroupRequestOptions(
  props: Readonly<GroupRequestOptionsProps>
) {
  const { request } = props;
  return (
    <Options>
      <ConfirmButton request={request} />
      <RejectButton request={request} />
    </Options>
  );
}

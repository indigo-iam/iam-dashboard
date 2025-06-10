// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import { Registration } from "@/models/registration";
import ConfirmButton from "./confirm-button";
import RejectButton from "./reject-button";

type RegistrationRequestOptionsProps = {
  request: Registration;
};

export default function RegistrationRequestsOptions(
  props: Readonly<RegistrationRequestOptionsProps>
) {
  const { request } = props;
  return (
    <Options>
      <ConfirmButton request={request} />
      <RejectButton request={request} />
    </Options>
  );
}

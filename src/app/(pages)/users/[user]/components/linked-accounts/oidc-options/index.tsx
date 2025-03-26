// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import UnlinkOidcAccount from "./unlink";
import { OidcId } from "@/models/indigo-user";

type OidcOptionsProps = {
  oidcId: OidcId;
};

export default function OidcOptions(props: Readonly<OidcOptionsProps>) {
  const { oidcId } = props;
  return (
    <Options>
      <UnlinkOidcAccount oidcId={oidcId} />
    </Options>
  );
}

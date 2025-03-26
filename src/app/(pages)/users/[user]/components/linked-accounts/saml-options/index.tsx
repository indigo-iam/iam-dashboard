// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Options from "@/components/options";
import Unlink from "./Unlink";

type SAMLOptionsProps = {};

export default function SAMLOptions(props: Readonly<SAMLOptionsProps>) {
  return (
    <Options>
      <Unlink {...props} />
    </Options>
  );
}

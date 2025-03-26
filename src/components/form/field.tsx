// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field as HeadlessField, FieldProps } from "@headlessui/react";

export default function Field(props: Readonly<FieldProps>) {
  return <HeadlessField {...props} className="space-y-2" />;
}

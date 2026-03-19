// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Field, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { Client } from "@/models/client";

type DeviceCodeTimeoutProps = {
  client: Client;
};

export function DeviceCodeTimeout(props: Readonly<DeviceCodeTimeoutProps>) {
  const { client } = props;
  const deviceCodeKey = "urn:ietf:params:oauth:grant-type:device_code";
  if (!client.grant_types.includes(deviceCodeKey)) {
    return null;
  }

  const { device_code_validity_seconds } = client;
  return (
    <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:gap-8">
      <div className="w-full space-y-4 text-sm lg:w-1/3">
        <div className="lg:space-y-2">
          <p className="font-semibold">Device code</p>
          <p className="font-light">
            Duration of the one-time generated code for the Device Code
            authorization grant.
          </p>
        </div>
      </div>
      <div className="lg:w-2/3">
        <Field>
          <Label>Device Code timeout (seconds)</Label>
          <Input
            type="number"
            id="device-code-validity-input"
            name="device_code_validity_seconds"
            defaultValue={device_code_validity_seconds}
          />
        </Field>
      </div>
    </div>
  );
}

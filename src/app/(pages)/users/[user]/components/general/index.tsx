// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { TabPanel } from "@/components/tabs";
import { User } from "@/models/scim";
import { Metadata } from "./metadata";
import { UserDetailsForm } from "./user-details-form";
import { Aup } from "./aup";
import { DangerZone } from "./danger-zone";
import { Section } from "@/components/layout";

type GeneralProps = {
  user: User;
  isMe: boolean;
};

export function General(props: Readonly<GeneralProps>) {
  const { user, isMe } = props;
  return (
    <TabPanel>
      <Section>
        <div className="grid grid-cols-6 gap-4">
          <Metadata user={user} />
          <UserDetailsForm user={user} />
          <hr className="col-span-full text-gray-300" />
          <Aup user={user} isMe={isMe} />
          {isMe ? null : (
            <>
              <hr className="col-span-full text-gray-300" />
              <DangerZone user={user} />
            </>
          )}
        </div>
      </Section>
    </TabPanel>
  );
}

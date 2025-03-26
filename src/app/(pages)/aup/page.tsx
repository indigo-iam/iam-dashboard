// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel, Section } from "@/components/layout";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";

export default async function AUP() {
  try {
    const aup = await fetchAUP();
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <Section>
            <AupView aup={aup} />
          </Section>
        </Panel>
      </Page>
    );
  } catch (err) {
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <Section>
            <p>AUP is not defined for this organization.</p>
            <CreateButton />
          </Section>
        </Panel>
      </Page>
    );
  }
}

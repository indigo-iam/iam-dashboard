// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";

export default async function AUP() {
  try {
    const aup = await fetchAUP();
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <div className="panel">
            <AupView aup={aup} />
          </div>
        </Panel>
      </Page>
    );
  } catch (err) {
    return (
      <Page title="Acceptable Usage Policy">
        <Panel>
          <div className="panel space-y-4">
            <p>AUP is not defined for this organization.</p>
            <CreateButton />
          </div>
        </Panel>
      </Page>
    );
  }
}

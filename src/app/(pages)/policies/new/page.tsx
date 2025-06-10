// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Page, Panel } from "@/components/layout";
import { Textarea } from "@/components/textarea";
import ConfirmButton from "./components/confirm-button";

export default async function Policies() {
  return (
    <Page title="Create Scope Policy">
      <Panel>
        <div className="section">
          <p className="font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in
            accumsan leo. Suspendisse potenti. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Vestibulum a metus sed ipsum sodales laoreet ac efficitur mi.
            Integer tempus sit amet enim eget consequat. Phasellus sit amet
            fringilla mi, id hendrerit quam.
          </p>
          <Textarea className="textarea w-full font-mono" />
          <ConfirmButton />
        </div>
      </Panel>
    </Page>
  );
}

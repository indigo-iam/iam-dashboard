// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";

export default async function AUP() {
  try {
    const aup = await fetchAUP();
    return (
      <Layout title="Acceptable Usage Policy">
        <div className="panel">
          <AupView aup={aup} />
        </div>
      </Layout>
    );
  } catch (err) {
    return (
      <Layout title="Acceptable Usage Policy">
        <div className="panel space-y-4">
          <p>AUP is not defined for this organization.</p>
          <CreateButton />
        </div>
      </Layout>
    );
  }
}

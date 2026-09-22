// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { ScopePoliciesForm } from "../components";

export default async function Policies() {
  return (
    <section>
      <header className="section-header">
        <h2 className="text-base font-normal">Create Scope Policy</h2>
      </header>
      <div className="container">
        <div className="space-y-4">
          <div className="panel space-y-4">
            <ScopePoliciesForm />
          </div>
        </div>
      </div>
    </section>
  );
}

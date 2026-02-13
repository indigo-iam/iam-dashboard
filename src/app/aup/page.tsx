// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Layout } from "@/app/components/layout";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default async function AUP() {
  const aup = await fetchAUP();
  if (!aup) {
    return (
      <Layout title="Acceptable Usage Policy">
        <div className="flex flex-col items-center space-y-4">
          <DocumentTextIcon className="text-primary/50 mt-32 size-48 dark:text-white/60" />
          <span className="text-center text-xl">
            AUP is not defined for this organization.
          </span>
          <CreateButton />
        </div>
      </Layout>
    );
  }
  return (
    <Layout title="Acceptable Usage Policy">
      <div className="panel">
        <AupView aup={aup} />
      </div>
    </Layout>
  );
}

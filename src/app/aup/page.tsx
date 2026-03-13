// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { getSession, isUserAdmin } from "@/auth";
import { fetchAUP } from "@/services/aup";
import { AupView, CreateButton } from "./components/";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

export default async function AUP() {
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    redirect("/");
  }
  const aup = await fetchAUP();
  if (!aup) {
    return (
      <section>
        <header className="section-header">
          <DocumentTextIcon className="size-5" />
          <h2 className="text-base font-normal">Acceptable Usage Policy</h2>
        </header>
        <div className="content flex flex-col space-y-4 lg:items-center">
          <DocumentTextIcon className="text-primary/50 mt-32 size-48 dark:text-white/60" />
          <span className="text-center text-xl">
            AUP is not defined for this organization.
          </span>
          <CreateButton />
        </div>
      </section>
    );
  }
  return (
    <section>
      <header className="section-header">
        <DocumentTextIcon className="size-5" />
        <h2 className="text-base font-normal">Acceptable Usage Policy</h2>
      </header>
      <div className="content space-y-4">
        <div className="panel">
          <AupView aup={aup} />
        </div>
      </div>
    </section>
  );
}

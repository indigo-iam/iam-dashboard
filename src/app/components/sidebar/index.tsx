// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import {
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxArrowDownIcon,
  RocketLaunchIcon,
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import { Drawer, Link } from "@/components/drawer";
import { settings } from "@/config";

const { IAM_DASHBOARD_APP_VERSION } = settings;

type LinksProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
};

function Links(props: Readonly<LinksProps>) {
  const { hasRoleAdmin, isAdmin } = props;
  if (hasRoleAdmin && isAdmin) {
    return (
      <div className="grow">
        <Link title="Home" href="/users/me">
          <HomeIcon className="size-5" />
        </Link>
        <Link title="Users" href="/users">
          <UserIcon className="size-5" />
        </Link>
        <Link title="Groups" href="/groups">
          <UserGroupIcon className="size-5" />
        </Link>
        <Link title="Clients" href="/clients">
          <RocketLaunchIcon className="size-5" />
        </Link>
        <Link title="Requests" href="/requests">
          <InboxArrowDownIcon className="size-5" />
        </Link>
        <Link title="Scopes" href="/scopes">
          <ClipboardDocumentCheckIcon className="size-5" />
        </Link>
        <Link title="AUP" href="/aup">
          <DocumentTextIcon className="size-5" />
        </Link>
        <Link title="Policies" href="/policies">
          <ScaleIcon className="size-5" />
        </Link>
      </div>
    );
  } else {
    return (
      <div className="grow">
        <Link title="Home" href="/users/me">
          <HomeIcon className="size-5" />
        </Link>
        <Link title={`${isAdmin ? "Groups" : "My Groups"}`} href="/groups">
          <UserGroupIcon className="size-5" />
        </Link>
        <Link title={`${isAdmin ? "Client" : "My Clients"}`} href="/clients">
          <RocketLaunchIcon className="size-5" />
        </Link>
      </div>
    );
  }
}

type SidebarProps = {
  hasRoleAdmin?: boolean;
  isAdmin?: boolean;
};

export async function Sidebar(props: Readonly<SidebarProps>) {
  const { hasRoleAdmin, isAdmin } = props;
  return (
    <Drawer>
      <div className="flex h-full flex-col">
        <nav className="flex grow flex-col overflow-y-auto px-6 py-8">
          <Links hasRoleAdmin={hasRoleAdmin} isAdmin={isAdmin} />
          <div className="p-2">
            <Link
              title="Privacy Policy"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              <BuildingLibraryIcon className="size-5" />
            </Link>
            <Link
              title="Support"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            >
              <ChatBubbleLeftRightIcon className="size-5" />
            </Link>
          </div>
        </nav>
        <div className="text-secondary w-full bg-slate-600 p-1 text-center text-sm">
          v{IAM_DASHBOARD_APP_VERSION}
        </div>
      </div>
    </Drawer>
  );
}

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Drawer as EmptyDrawer, Link } from "@/components/drawer";
import Notifications from "@/components/notifications";
import { Logout } from "@/components/buttons";
import { Page as EmptyPage } from "@/components/layout";
import {
  ClipboardDocumentCheckIcon,
  HomeIcon,
  InboxArrowDownIcon,
  RocketLaunchIcon,
  ScaleIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { auth } from "@/auth";

function LogoIam() {
  return (
    <div className="flex">
      <Image
        src="/cloud.png"
        width="0"
        height="0"
        sizes="100vw"
        className="my-auto w-20"
        alt="INFN Cloud"
        priority={true}
      />
      <div className="text-secondary my-auto px-4 py-1 text-2xl font-bold">
        INDIGO IAM for cnafsd
      </div>
    </div>
  );
}

function UserLogo(props: Readonly<{ username?: string | null }>) {
  const { username } = props;
  return (
    <div className="text-secondary flex items-center justify-center px-2">
      <UserCircleIcon className="size-12" />
      <h2 className="px-4">{username ?? "Unknown user"}</h2>
    </div>
  );
}

function SessionButtons() {
  return (
    <div className="flex justify-around border-b border-slate-700 p-2">
      <Notifications />
      <Logout />
    </div>
  );
}

function AccountManagement() {
  return (
    <div className="px-6">
      <span className="text-secondary font-bold">ACCOUNT MANAGEMENT</span>
      <Link title="Home" href="/users/me">
        <HomeIcon className="size-5" />
      </Link>
    </div>
  );
}

function OrganizationManagement() {
  return (
    <div className="px-6">
      <span className="text-secondary font-bold">ORGANIZATION MANAGEMENT</span>
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
        <ClipboardDocumentCheckIcon className="size-5" />
      </Link>
      <Link title="Policies" href="/policies">
        <ScaleIcon className="size-5" />
      </Link>
    </div>
  );
}

type PageProps = {
  title?: string;
  children?: React.ReactNode;
};

export async function Page(props: Readonly<PageProps>) {
  const { title, children } = props;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;
  const username = session?.user?.name;
  return (
    <EmptyPage title={title}>
      <EmptyDrawer title={title}>
        <div className="fixed">
          <LogoIam />
        </div>
        <div className="fixed inset-0 mt-16 overflow-auto">
          <UserLogo username={username} />
          <SessionButtons />
          <AccountManagement />
          {isAdmin && <OrganizationManagement />}
        </div>
      </EmptyDrawer>
      {children}
    </EmptyPage>
  );
}

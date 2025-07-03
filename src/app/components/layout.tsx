// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import NextLink from "next/link";
import { Drawer, Link } from "@/components/drawer";
import Notifications from "@/components/notifications";
import {
  ArrowRightEndOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
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
import { settings } from "@/config";
import { User } from "@/models/scim";

const basePath = settings.basePath ?? "";

function LogoIam() {
  return (
    <div className="flex px-4">
      <Image
        src={`${basePath}/cloud.png`}
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
      <span className="px-4 text-2xl font-bold">
        {username ?? "Unknown user"}
      </span>
    </div>
  );
}

function SessionButtons() {
  return (
    <div className="flex justify-around border-b border-slate-700 pb-2">
      <Notifications />
      <NextLink
        title="Signout"
        href="/signout"
        className="text-secondary flex rounded-full p-2 hover:bg-white/10"
      >
        <ArrowRightEndOnRectangleIcon className="size-6" />
      </NextLink>
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
        <DocumentTextIcon className="size-5" />
      </Link>
      <Link title="Policies" href="/policies">
        <ScaleIcon className="size-5" />
      </Link>
    </div>
  );
}

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

export async function Layout(props: Readonly<LayoutProps>) {
  const { title, children } = props;
  const session = await auth();
  const isAdmin = session?.is_admin ?? false;
  const username = session?.user?.name;
  return (
    <div className="mt-16 ml-0 md:mt-0 md:ml-80" id={title}>
      <h1 className="text-primary dark:text-secondary z-10 flex h-0 items-center border-b border-b-gray-300 bg-gray-100 p-0 opacity-0 md:h-16 md:p-4 md:opacity-100 dark:bg-slate-950">
        {title}
      </h1>
      <Drawer title={title}>
        <div className="bg-infn dark:bg-dark sticky top-0 z-40">
          <LogoIam />
        </div>
        <nav className="space-y-4">
          <UserLogo username={username} />
          <SessionButtons />
          <AccountManagement />
          {isAdmin && <OrganizationManagement />}
        </nav>
      </Drawer>
      <div className="3xl:max-w-2/3 mx-auto p-4 md:px-16 md:py-8 xl:max-w-3/4">
        {children}
      </div>
    </div>
  );
}

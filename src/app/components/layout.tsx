// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import NextLink from "next/link";
import { Drawer, Link, ToggleDrawerButton } from "@/components/drawer";
import Notifications from "@/components/notifications";
import {
  ArrowRightEndOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxArrowDownIcon,
  RocketLaunchIcon,
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { auth } from "@/auth";
import { settings } from "@/config";
import { AdminModeSwitch } from "./admin-mode-switch";
import { cookies } from "next/headers";
import { Gravatar } from "@/components/gravatar";

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

function UserLogo(
  props: Readonly<{ username?: string | null; email?: string | null }>
) {
  const { username, email } = props;
  return (
    <div className="text-secondary flex items-center gap-4">
      <Gravatar email={email} />
      <span className="text-center text-xl font-bold">
        {username ?? "Unknown user"}
      </span>
    </div>
  );
}

function Signout() {
  return (
    <NextLink
      title="Signout"
      href="/signout"
      className="text-secondary flex justify-center gap-4 rounded-md border border-white/30 bg-linear-to-b from-white/10 from-5% via-transparent via-50% to-white/10 to-95% p-2 hover:bg-white/10"
    >
      Sign Out
      <ArrowRightEndOnRectangleIcon className="size-6" />
    </NextLink>
  );
}

function Links(props: Readonly<{ isAdmin: boolean; adminMode: boolean }>) {
  const { isAdmin, adminMode } = props;
  if (isAdmin && adminMode) {
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
      </div>
    );
  }
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
  const email = session?.user?.email;
  const cookiesStore = await cookies();
  const adminModeEnabled = cookiesStore.get("admin-mode")?.value === "enabled";
  return (
    <div id={title}>
      <header className="text-secondary md:text-primary bg-infn md:bg-secondary sticky top-0 flex grow justify-between border-b border-b-gray-300 p-4 md:ml-80">
        <h2 className="my-auto text-2xl">{title}</h2>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <AdminModeSwitch defaultChecked={adminModeEnabled} />
              <Notifications
                className="hidden data-[visible=true]:block"
                data-visible={isAdmin && adminModeEnabled}
              />
            </>
          )}
          <ToggleDrawerButton />
        </div>
      </header>
      <Drawer>
        <div className="flex h-full flex-col">
          <div className="bg-infn sticky top-0 z-40">
            <LogoIam />
          </div>
          <nav className="mt-4 flex grow flex-col justify-between p-6">
            <Links isAdmin={isAdmin} adminMode={adminModeEnabled} />
            <div className="space-y-2 border-t border-white/30 py-2">
              <UserLogo username={username} email={email} />
              <Signout />
            </div>
          </nav>
        </div>
      </Drawer>
      <div className="3xl:max-w-2/3 mx-auto p-4 md:ml-80 md:px-16 md:py-8 xl:max-w-3/4">
        {children}
      </div>
    </div>
  );
}

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import Image from "next/image";
import { redirect } from "next/navigation";
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  InboxArrowDownIcon,
  RocketLaunchIcon,
  ScaleIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { getAccessToken, getSession, isUserAdmin } from "@/auth";
import { Drawer, Link, ToggleDrawerButton } from "@/components/drawer";
import { Gravatar } from "@/components/gravatar";
import Notifications from "@/components/notifications";
import { AdminModeSwitch } from "@/app/components/admin-mode-switch";
import cloud from "./cloud.png";
import { CookiesBanner } from "./cookies-banner";
import { SignoutButton } from "./signout-button";

function LogoIam() {
  return (
    <div className="flex px-4">
      <Image
        src={cloud}
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
        <Link title="Clients" href="/clients">
          <RocketLaunchIcon className="size-5" />
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
  const session = await getSession();
  if (!session) {
    redirect("/signin");
  }
  const { user } = session;
  const { hasRoleAdmin, name, email } = user;
  const isAdmin = await isUserAdmin();
  return (
    <div id={title}>
      <header className="text-secondary md:text-primary bg-infn dark:bg-infn dark:text-secondary md:bg-secondary fixed inset-x-0 top-0 z-40 flex grow justify-between border-b border-b-gray-300 p-4 md:ml-80">
        <h2 className="my-auto text-2xl">{title}</h2>
        <div className="flex items-center gap-2">
          {hasRoleAdmin && (
            <>
              <AdminModeSwitch defaultChecked={isAdmin} />
              <Notifications
                className="hidden data-[visible=true]:block"
                data-visible={isAdmin && hasRoleAdmin}
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
            <Links isAdmin={hasRoleAdmin} adminMode={isAdmin} />
            <div className="space-y-2 border-t border-white/30 py-2">
              <UserLogo username={name} email={email} />
              <SignoutButton />
            </div>
          </nav>
        </div>
      </Drawer>
      <div className="absolute top-16 right-0 left-0 p-4 md:left-80">
        <div className="3xl:max-w-2/3 mx-auto xl:max-w-3/4">{children}</div>
      </div>
      <CookiesBanner />
    </div>
  );
}

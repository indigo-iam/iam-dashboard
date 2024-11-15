import Drawer, {
  DrawerSection,
  DrawerBody,
  DrawerFooter,
} from "@/components/Drawer";
import {
  HomeIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
  InformationCircleIcon,
  InboxArrowDownIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/16/solid";
import LogoHeader from "./LogoHeader";
import Link from "./Link";
import { auth } from "@/auth";

const LEFT_SIDEBAR_ID = "left-sidebar";

type SidebarLinkProps = {
  title: string;
  icon: JSX.Element;
  href: string;
};

const SidebarLink = (props: SidebarLinkProps) => {
  return <Link sidebarId={LEFT_SIDEBAR_ID} {...props} />;
};

const AccountManagement = () => {
  return (
    <DrawerSection title="Account Management">
      <SidebarLink title="Home" href="/users/me" icon={<HomeIcon />} />
      <SidebarLink
        title="My Clients"
        href="/me/clients"
        icon={<RocketLaunchIcon />}
      />
    </DrawerSection>
  );
};

const OrganizationManagement = async () => {
  const session = await auth();
  if (session?.is_admin) {
    return (
      <DrawerSection title="Organization Management">
        <nav>
          <SidebarLink title="Users" href="/users" icon={<UserIcon />} />
          <SidebarLink title="Groups" href="/groups" icon={<UserGroupIcon />} />
          <SidebarLink
            title="Clients"
            href="/clients"
            icon={<RocketLaunchIcon />}
          />
          <SidebarLink
            title="Requests"
            href="/requests"
            icon={<InboxArrowDownIcon />}
          />
          <SidebarLink
            title="Scopes"
            href="/scopes"
            icon={<ClipboardDocumentCheckIcon />}
          />
          <SidebarLink
            title="AUP"
            href="/aup"
            icon={<ClipboardDocumentListIcon />}
          />
        </nav>
      </DrawerSection>
    );
  }
};

const Body = () => {
  return (
    <DrawerBody>
      <LogoHeader />
      <AccountManagement />
      <OrganizationManagement />
    </DrawerBody>
  );
};

const Footer = () => {
  return (
    <DrawerFooter>
      <a
        target="_blank"
        className="flex rounded-lg p-2 transition ease-in-out hover:bg-primary-hover"
        href="https://indigo-iam.github.io/v/current/"
      >
        <InformationCircleIcon className="me-2 h-5 w-5" />
        IAM Documentation
      </a>
      <p className="w-full bg-primary-light text-center align-middle">v1.0</p>
    </DrawerFooter>
  );
};

export default function Sidebar() {
  return (
    <Drawer id={LEFT_SIDEBAR_ID}>
      <Body />
      <Footer />
    </Drawer>
  );
}

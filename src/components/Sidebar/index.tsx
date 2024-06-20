import Drawer, {
  DrawerSection,
  DrawerBody,
  DrawerFooter,
} from "@/components/Drawer";
import { LogoHeader } from "@/components/LogoHeader";
import {
  HomeIcon,
  KeyIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "./Link";

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
      <SidebarLink title="Home" href="/" icon={<HomeIcon />} />
      <SidebarLink
        title="My Clients"
        href="/me/clients"
        icon={<RocketLaunchIcon />}
      />
    </DrawerSection>
  );
};

const OrganizationManagement = () => {
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
        <SidebarLink title="Tokens" href="/tokens" icon={<KeyIcon />} />
      </nav>
    </DrawerSection>
  );
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
      <SidebarLink
        title="Privacy Policy"
        href="/privacy"
        icon={<ShieldCheckIcon />}
      />
      <SidebarLink
        title="IAM Documentation"
        href="/docs"
        icon={<InformationCircleIcon />}
      />
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

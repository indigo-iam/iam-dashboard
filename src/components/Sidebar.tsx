import {
  Drawer,
  DrawerLink,
  DrawerSection,
  LogoHeader,
  DrawerBody,
  DrawerFooter,
} from ".";
import {
  HomeIcon,
  KeyIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  UserIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

const AccountManagement = () => {
  return (
    <DrawerSection title="Account Management">
      <DrawerLink title="Home" href="/" icon={<HomeIcon />} />
    </DrawerSection>
  );
};

const OrganizationManagement = () => {
  return (
    <DrawerSection title="Organization Management">
      <DrawerLink title="Users" href="/users" icon={<UserIcon />} />
      <DrawerLink title="Groups" href="/groups" icon={<UserGroupIcon />} />
      <DrawerLink title="Clients" href="/clients" icon={<RocketLaunchIcon />} />
      <DrawerLink title="Tokens" href="/tokens" icon={<KeyIcon />} />
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
      <DrawerLink
        title="Privacy Policy"
        href="/privacy"
        icon={<ShieldCheckIcon />}
      />
      <DrawerLink
        title="IAM Documentation"
        href="/docs"
        icon={<InformationCircleIcon />}
      />
      <div className="bg-primary-light h-4 w-full text-center">v1.0</div>
    </DrawerFooter>
  );
};

export interface SidebarProps {
  width: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { width } = props;

  return (
    <Drawer width={width}>
      <Body />
      <Footer />
    </Drawer>
  );
};

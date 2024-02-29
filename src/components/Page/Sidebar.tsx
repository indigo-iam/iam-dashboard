import {
  Drawer,
  DrawerLink,
  DrawerFooterLink,
  DrawerSection,
  LogoHeader,
  DrawerBody,
  DrawerFooter,
} from "..";
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
      <DrawerLink title="Home" icon={<HomeIcon />} />
    </DrawerSection>
  );
};

const OrganizationManagement = () => {
  return (
    <DrawerSection title="Organization Management">
      <DrawerLink title="Users" icon={<UserIcon />} />
      <DrawerLink title="Groups" icon={<UserGroupIcon />} />
      <DrawerLink title="Clients" icon={<RocketLaunchIcon />} />
      <DrawerLink title="Tokens" icon={<KeyIcon />} />
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
      <DrawerFooterLink title="Privacy Policy" icon={<ShieldCheckIcon />} />
      <DrawerFooterLink
        title="IAM Documentation"
        icon={<InformationCircleIcon />}
      />
      <div className="infn-version">v1.0</div>
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

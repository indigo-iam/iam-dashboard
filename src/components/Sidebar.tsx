import Drawer, {
  DrawerLink,
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
      <p className="bg-primary-light w-full text-center align-middle">v1.0</p>
    </DrawerFooter>
  );
};

export default function Sidebar() {
  return (
    <Drawer id="left-sidebar">
      <Body />
      <Footer />
    </Drawer>
  );
}

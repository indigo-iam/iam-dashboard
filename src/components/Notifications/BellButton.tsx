import { DrawerButton } from "@/components/Drawer/DrawerButton";
import { BellIcon } from "@heroicons/react/20/solid";

export default function BellButton() {
  return <DrawerButton icon={<BellIcon />} title="Notifications" />;
}

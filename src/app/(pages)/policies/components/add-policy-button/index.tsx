import { Button } from "@/components/buttons";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function AddPolicyButton() {
  return (
    <Button action="primary-outline" icon={<PlusIcon />}>
      <Link href="/policies/new">Add new policy</Link>
    </Button>
  );
}

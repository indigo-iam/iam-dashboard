import { Group } from "@/models/groups";
import { fetchGroupMembersPage } from "@/services/groups";
import { ScimReference } from "@/models/scim";
import MemberOptions from "./options";
import Link from "next/link";

function Row(props: Readonly<{ member: ScimReference }>) {
  const { member } = props;
  return (
    <li className="flex flex-row border-b p-2 hover:rounded-md hover:bg-neutral-200 has-[+:hover]:border-transparent">
      <div className="flex grow flex-col">
        <Link
          className="flex grow flex-col font-bold hover:underline"
          href={`/users/${member.value}`}
        >
          {member.display}
          <small className="iam-text-light">{member.value}</small>
        </Link>
      </div>
      <div className="flex flex-col">
        <MemberOptions />
      </div>
    </li>
  );
}

type MembersProps = {
  group: Group;
  members: ScimReference[];
};
export default async function Members(props: Readonly<MembersProps>) {
  const { group } = props;
  // TODO: pagination
  const members = (await fetchGroupMembersPage(group.id)).Resources;

  if (members.length === 0) {
    return <p>This group has no members.</p>;
  }

  return (
    <ul className="w-full">
      {members.map(member => (
        <Row key={member.value} member={member} />
      ))}
    </ul>
  );
}

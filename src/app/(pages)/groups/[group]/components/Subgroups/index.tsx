"use client";
import { Group } from "@/models/groups";
import SubgroupsTable from "./Table";

type SubgroupsProps = {
  group: Group;
};

export default function Subgroups(props: Readonly<SubgroupsProps>) {
  const { group } = props;
  return <SubgroupsTable group={group} />;
}
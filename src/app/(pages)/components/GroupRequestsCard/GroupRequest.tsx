"use client";
import { Button } from "@/components/Button";
import { GroupRequestResource } from "@/models/Me";
import { abortGroupRequest } from "@/services/group-requests";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { useTransition } from "react";

const Row = (props: { title: string; value: string }) => {
  const { title, value } = props;
  return (
    <div className="row">
      <div className="col-2">
        <b>{title}</b>
      </div>
      <div className="col">{value}</div>
    </div>
  );
};

export const GroupRequest = (props: { resource: GroupRequestResource }) => {
  const { resource } = props;
  const { userFullName, username, uuid, groupName, groupUuid } = resource;
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const err = await abortGroupRequest(resource);
      if (err) {
        console.error(err);
      }
    });
  };

  return (
    <form className="container border-bottom p-2 mt-2">
      <div className="row">
        <div className="col">
          <Row title="Username" value={userFullName ?? username} />
          <Row title="User ID" value={uuid} />
          <Row title="Group" value={groupName} />
          <Row title="Group ID" value={groupUuid} />
        </div>
        <div className="col-auto flex flex-row-reverse">
          <Button
            color="danger"
            className="my-auto"
            icon={<XCircleIcon />}
            isSmall={true}
            type="button"
            onClick={handleClick}
            disabled={isPending}
          >
            Unlink
          </Button>
        </div>
      </div>
    </form>
  );
};

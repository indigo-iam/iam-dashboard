// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { revalidatePath } from "next/cache";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { User } from "@/models/scim";
import { patchUser, statusMFA } from "@/services/users";
import { dateToHuman } from "@/utils/dates";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { ResetPassword } from "./reset-password";
import { MFAButton } from "./mfa";
import { Status } from "@/components/badges";

type UserDetailsFormProps = {
  user: User;
  isMe: boolean;
};

export async function UserDetailsForm(props: Readonly<UserDetailsFormProps>) {
  const { user, isMe } = props;
  const mfaEnabled = await statusMFA();

  const action = async (formData: FormData) => {
    "use server";
    await patchUser(user.id, formData);
    revalidatePath("/users/[user]", "page");
  };

  const created = user.meta?.created
    ? dateToHuman(new Date(user.meta.created))
    : "N/A";
  const modified = user.meta?.lastModified
    ? dateToHuman(new Date(user.meta.lastModified))
    : "N/A";

  return (
    <div className="border-light-gray flex flex-col gap-4 border-b pb-4 lg:flex-row">
      <div className="grow space-y-2 text-sm font-light">
        <div className="text-light dark:text-extralight/60 flex flex-wrap justify-between">
          <div className="flex gap-2">
            <IdentificationIcon className="my-auto size-5" />
            UUID
          </div>
          <Status active={user.active ?? false} />
        </div>
        <div className="text-extralight" data-testid="user-id">
          {user.id}
        </div>
        <div className="text-extralight">
          <div>Created {created}.</div>
          <div>Last modified {modified}.</div>
        </div>
      </div>
      <Form className="min-w-2/3 grow space-y-2" action={action}>
        <div className="flex flex-wrap gap-x-4">
          <Field className="flex max-w-full grow flex-col">
            <Label data-required>First Name</Label>
            <Input
              required
              type="text"
              id="given-name"
              name="given-name"
              minLength={2}
              defaultValue={user.name?.givenName}
            />
          </Field>
          <Field className="flex max-w-full grow flex-col">
            <Label data-required>Last Name</Label>
            <Input
              required
              type="text"
              id="family-name"
              name="family-name"
              minLength={2}
              defaultValue={user.name?.familyName}
            />
          </Field>
        </div>
        <Field className="flex flex-col">
          <Label>Username</Label>
          <Input defaultValue={user.userName} disabled />
        </Field>
        <Field className="flex flex-col">
          <Label data-required>Email</Label>
          <Input
            required
            type="email"
            id="email"
            name="email"
            defaultValue={user.emails?.[0].value}
          />
        </Field>
        <Field className="col-span-full flex flex-col">
          <Label>Authentication</Label>
          <div className="flex flex-wrap gap-2">
            {isMe && <MFAButton enabled={mfaEnabled} />}
            <ResetPassword user={user} />
          </div>
        </Field>
        <Field className="flex justify-between">
          <Button className="btn-tertiary" type="reset">
            Cancel
          </Button>
          <Button className="btn-secondary" type="submit">
            Save changes
          </Button>
        </Field>
      </Form>
    </div>
  );
}

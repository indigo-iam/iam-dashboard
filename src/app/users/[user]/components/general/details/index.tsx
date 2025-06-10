// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { revalidatePath } from "next/cache";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { User } from "@/models/scim";
import { patchUser, statusMFA } from "@/services/users";
import { ResetPassword } from "./reset-password";
import { MFAButton } from "./mfa";

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

  return (
    <Form
      className="col-span-full grid grid-cols-subgrid gap-4 sm:col-span-4"
      action={action}
    >
      <Field className="col-span-full flex flex-col sm:col-span-2">
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
      <Field className="col-span-full flex flex-col sm:col-span-2">
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
      <Field className="col-span-full flex flex-col">
        <Label>Username</Label>
        <Input defaultValue={user.userName} disabled />
      </Field>
      <Field className="col-span-full flex flex-col">
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
        <div className="flex gap-2">
          {isMe && <MFAButton enabled={mfaEnabled} />}
          <ResetPassword user={user} />
        </div>
      </Field>
      <Field className="col-span-full flex justify-between">
        <Button className="btn-tertiary" type="reset">
          Cancel
        </Button>
        <Button className="btn-secondary" type="submit">
          Save changes
        </Button>
      </Field>
    </Form>
  );
}

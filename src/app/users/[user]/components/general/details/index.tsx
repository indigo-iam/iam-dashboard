// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Status } from "@/components/badges";
import { Button } from "@/components/buttons";
import { Field, Form, Label } from "@/components/form";
import { Input } from "@/components/inputs";
import { editUser } from "@/services/users";
import { toast } from "@/components/toaster";
import { dateToHuman } from "@/utils/dates";
import { ResetPassword } from "./reset-password";
import { MFAButton } from "./mfa";

type UserDetailsFormProps = {
  userId: string;
  userName: string;
  userGivenName: string;
  userFamilyName: string;
  userMiddleName: string | null;
  userFormattedName: string;
  userEmail: string;
  userCreatedAt?: string;
  userLastModified?: string;
  userIsActive: boolean;
  isMe: boolean;
  mfaEnabled: boolean;
};

export function UserDetailsForm(props: Readonly<UserDetailsFormProps>) {
  const {
    userId,
    userName,
    userGivenName,
    userFamilyName,
    userMiddleName,
    userFormattedName,
    userEmail,
    userCreatedAt,
    userLastModified,
    userIsActive,
    isMe,
    mfaEnabled,
  } = props;

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const givenName = formData.get("given-name") as string | null;
    const familyName = formData.get("family-name") as string | null;
    const middleName = formData.get("middle-name") as string | null;
    const email = formData.get("email") as string | null;
    const res = await editUser({
      givenName,
      familyName,
      middleName,
      email,
      userId: isMe ? null : userId,
    });
    toast.toast(res);
  }

  const created = userCreatedAt ? dateToHuman(new Date(userCreatedAt)) : "N/A";
  const modified = userLastModified
    ? dateToHuman(new Date(userLastModified))
    : "N/A";

  return (
    <div className="flex flex-col gap-8 pb-4 lg:flex-row">
      <div className="w-full space-y-2 text-sm font-light lg:w-1/3">
        <div className="flex flex-wrap justify-between">
          <div className="flex gap-2">
            <IdentificationIcon className="my-auto size-5" />
            <h5 className="font-semibold text-gray-600 dark:text-gray-100">
              Profile
            </h5>
          </div>
          <Status active={userIsActive} />
        </div>
        <p className="break-all" data-testid="user-id">
          {userId}
        </p>
        <div>
          <p>Created {created}.</p>
          <p>Last modified {modified}.</p>
        </div>
      </div>
      <div className="w-full space-y-4 lg:w-2/3">
        <Form className="space-y-4" onSubmit={submit}>
          <div className="flex flex-wrap gap-4">
            <Field className="flex max-w-full grow flex-col">
              <Label htmlFor="given-name" data-required>
                First Name
              </Label>
              <Input
                required
                type="text"
                id="given-name"
                name="given-name"
                minLength={2}
                defaultValue={userGivenName}
              />
            </Field>
            <Field className="flex max-w-full grow flex-col">
              <Label htmlFor="family-name" data-required>
                Last Name
              </Label>
              <Input
                required
                type="text"
                id="family-name"
                name="family-name"
                minLength={2}
                defaultValue={userFamilyName}
              />
            </Field>
            <Field className="flex max-w-full grow flex-col">
              <Label htmlFor="middle-name">Middle Name</Label>
              <Input
                type="text"
                id="middle-name"
                name="middle-name"
                minLength={2}
                defaultValue={userMiddleName ?? undefined}
              />
            </Field>
          </div>
          <Field className="flex flex-col">
            <Label htmlFor="username" data-required>
              Username
            </Label>
            <Input name="username" defaultValue={userName} required disabled />
          </Field>
          <Field className="flex flex-col">
            <Label htmlFor="email" data-required>
              Email
            </Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              defaultValue={userEmail}
            />
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
        <Field className="col-span-full flex flex-col">
          <Label>Authentication</Label>
          <div className="flex flex-wrap gap-2">
            {isMe && <MFAButton enabled={mfaEnabled} />}
            <ResetPassword
              isMe={isMe}
              userId={userId}
              userFormattedName={userFormattedName}
              userEmail={userEmail}
            />
          </div>
        </Field>
      </div>
    </div>
  );
}

// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";
import { Input } from "@/components/inputs";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";
import { useState } from "react";

type InputDescriptionProps = {
  scope: Scope;
};

export default function InputDescription(
  props: Readonly<InputDescriptionProps>
) {
  const { scope } = props;
  const [description, setDescription] = useState(scope.description);

  const action = async () => {
    if (description != scope.description) {
      const newScope = { ...scope, description };
      await editScope(newScope);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <Input
      defaultValue={scope.description}
      onBlur={action}
      onChange={e => setDescription(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
      className="min-w-4"
    />
  );
}

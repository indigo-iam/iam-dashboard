// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

"use client";

import { Button } from "@/components/buttons";
import { Textarea } from "@/components/textarea";
import { ScopePolicy } from "@/models/scope-policies";
import { ChangeEvent, useState } from "react";

type EditorProps = {
  policy: ScopePolicy;
};

export default function Editor(props: Readonly<EditorProps>) {
  const { policy } = props;
  const policy_str = JSON.stringify(policy, null, 2);
  const [newPolicy, setNewPolicy] = useState(policy_str);
  const [editing, setEditing] = useState(false);

  const handleOnClickEdit = () => {
    if (editing) {
      setNewPolicy(policy_str);
    }
    setEditing(!editing);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPolicy(event.target.value);
  };

  const handleSubmit = () => {
    // TODO: implement submit
    setEditing(false);
  };

  return (
    <>
      <Textarea
        className="overflow-hidden font-mono textarea w-full"
        rows={policy_str.split("\n").length}
        disabled={!editing}
        value={newPolicy}
        onChange={handleChange}
      />
      <div className="flex justify-end gap-2">
        <Button className="btn-secondary" onClick={handleOnClickEdit}>
          {editing ? "Cancel" : "Edit"}
        </Button>
        <Button
          className="btn-primary"
          disabled={!editing || newPolicy === policy_str}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}

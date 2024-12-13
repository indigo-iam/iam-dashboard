"use client";
import { Select, SelectOption } from "@/components/form";
import { Scope } from "@/models/client";
import { editScope } from "@/services/scopes";

export default function ScopeTypeSelect(props: { scope: Scope }) {
  const { scope } = props;

  const options = [
    { id: "none", name: "None" },
    { id: "default", name: "Default" },
    { id: "restricted", name: "Restricted" },
  ];

  let defaultOption = options[0];
  if (scope.defaultScope) {
    defaultOption = options[1];
  } else if (scope.restricted) {
    defaultOption = options[2];
  }

  const handleChange = (value: { id: string; name: string }) => {
    const newScope = { ...scope };
    switch (value.id) {
      case "default": {
        newScope.defaultScope = true;
        newScope.restricted = false;
        break;
      }
      case "restricted": {
        newScope.defaultScope = false;
        newScope.restricted = true;
        break;
      }
      default: {
        newScope.defaultScope = false;
        newScope.restricted = false;
      }
    }
    editScope(newScope);
  };

  return (
    <Select
      name="scope-type"
      onChange={handleChange}
      defaultValue={defaultOption}
      className="w-full"
    >
      {options.map(o => (
        <SelectOption key={o.id} value={o}>
          {o.name}
        </SelectOption>
      ))}
    </Select>
  );
}

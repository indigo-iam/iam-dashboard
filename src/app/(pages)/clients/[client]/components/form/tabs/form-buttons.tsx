// SPDX-FileCopyrightText: 2025 Istituto Nazionale di Fisica Nucleare
//
// SPDX-License-Identifier: EUPL-1.2

import { Button } from "@/components/buttons";
import {
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

export default function FormButtons() {
  return (
    <div className="grid grid-rows-2 gap-2 sm:grid-cols-2">
      <div className="flex flex-row gap-1">
        <Button className="btn-danger">
          <TrashIcon className="my-auto size-5" />
          Delete Client
        </Button>
        <Button className="btn-danger-tertiary">Disable Client</Button>
      </div>

      <div className="flex flex-row gap-1 sm:justify-end">
        <Button className="btn-tertiary" type="reset">
          Reset
        </Button>
        <Button className="btn-primary" title="Submit" type="submit">
          <PencilSquareIcon className="my-auto size-5" />
          Save Client
        </Button>
      </div>
    </div>
  );
}

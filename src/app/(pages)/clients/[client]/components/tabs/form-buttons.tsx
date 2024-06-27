import Button from "@/components/Button";
import {
  NoSymbolIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

export default function FormButtons() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        <Button action="danger" icon={<XCircleIcon />}>
          Delete Client
        </Button>
        <Button action="warning" icon={<NoSymbolIcon />}>
          Disable Client
        </Button>
      </div>
      <div className="flex gap-1">
        <Button action="primary-outline" type="reset">
          Reset
        </Button>
        <Button action="primary-outline">Cancel</Button>
        <Button
          action="success"
          title="Submit"
          icon={<PencilSquareIcon />}
          type="submit"
        >
          Save Client
        </Button>
      </div>
    </div>
  );
}

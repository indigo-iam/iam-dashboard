import { Button } from "@/components/Button";
import { fetchAup } from "@/services/aup";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import { AupCard } from "./AupCard";

export default async function Aup() {
  const aup = await fetchAup();
  return (
    <div>
      <div className="flex items-stretch">
        <div
          className="me-2 my-auto"
          style={{
            width: "24px",
            height: "24px",
          }}
        >
          <DocumentTextIcon />
        </div>
        <div>
          <h1>Acceptable Usage Policy</h1>
        </div>
      </div>

      <AupCard aup={aup}></AupCard>
      <div>
        <Button type="button" className="my-auto" color="primary">
          Edit AUP
        </Button>
        <Button type="button" className="my-auto" color="warning">
          Request AUP signature
        </Button>
        <Button type="button" className="my-auto" color="danger">
          Delete AUP
        </Button>
      </div>
    </div>
  );
}

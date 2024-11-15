import Options from "@/components/Options";
import { Scope } from "@/models/client";
import DeleteButton from "./DeleteButton";

type ScopeOptionsProps = {
  scope: Scope;
};

export default function ScopeOptions(props: Readonly<ScopeOptionsProps>) {
  const { scope } = props;
  return (
    <Options>
      <DeleteButton scope={scope} />
    </Options>
  );
}

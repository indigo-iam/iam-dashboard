import Options from "@/components/options";
import { Scope } from "@/models/client";
import DeleteButton from "./delete-button";

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

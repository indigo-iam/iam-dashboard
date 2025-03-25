import Options from "@/components/options";
import { ScopePolicy } from "@/models/scope-policies";
import DeletePolicy from "./delete-policy";

type PolicyOptionsProps = {
  policy: ScopePolicy;
};

export default function PolicyOptions(props: Readonly<PolicyOptionsProps>) {
  const { policy } = props;
  return (
    <Options>
      <DeletePolicy policy={policy} />
    </Options>
  );
}

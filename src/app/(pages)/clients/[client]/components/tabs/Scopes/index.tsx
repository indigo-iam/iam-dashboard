import { Form, FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { Scope } from "@/models/client";
import { fetchScopes } from "@/services/scopes";

const SystemScopes = (props: { scopes: Scope[] }) => {
  return props.scopes
    .filter(scope => !scope.restricted)
    .map(scope => (
      <div key={scope.value} className="flex flex-row gap-1 py-0.5">
        <input
          type="checkbox"
          id={scope.value}
          name="scopes"
          value={scope.value}
          defaultChecked={scope.defaultScope}
        />
        <label htmlFor={scope.value}>
          {scope.value}
          {scope.description && ` (${scope.description})`}
        </label>
      </div>
    ));
};

export default async function Scopes() {
  const scopes = await fetchScopes();
  return (
    <TabPanel>
      <FormSection htmlFor="system-scopes-radio" title="System Scopes">
        <SystemScopes scopes={scopes} />
      </FormSection>
    </TabPanel>
  );
}

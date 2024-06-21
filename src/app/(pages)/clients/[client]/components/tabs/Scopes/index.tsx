import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { ClientScopes, Scope } from "@/models/client";
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

interface ScopesProps extends ClientScopes {}

export default async function Scopes(props: Readonly<ScopesProps>) {
  const scopes = await fetchScopes();

  // If the client has scopes, use them to determine the selection state
  if (props.scope) {
    const client_scopes = props.scope.split(" ");
    scopes.forEach(scope => {
      scope.defaultScope =
        client_scopes.findIndex(cs => cs === scope.value) > 0;
    });
  }

  return (
    <TabPanel unmount={false}>
      <FormSection htmlFor="system-scopes-radio" title="System Scopes">
        <SystemScopes scopes={scopes} />
      </FormSection>
    </TabPanel>
  );
}

import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { ClientScopes, Scope } from "@/models/client";
import { fetchScopes } from "@/services/scopes";

interface ActiveScope extends Scope {
  active: boolean;
}

const SystemScopes = (props: { scopes: ActiveScope[] }) => {
  return props.scopes
    .filter(scope => !scope.restricted)
    .map(scope => (
      <div key={scope.value} className="flex flex-row gap-1 py-0.5">
        <input
          type="checkbox"
          id={scope.value}
          name="scope"
          value={scope.value}
          defaultChecked={scope.active}
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
  const clientScopes = props.scope?.split(" ");
  const allScopes = await fetchScopes();

  let scopes: ActiveScope[] = allScopes.map(s => {
    return { ...s, active: s.defaultScope };
  });

  // If the client has scopes, use them to determine the selection state
  if (clientScopes) {
    scopes.forEach(scope => {
      scope.active = clientScopes.findIndex(cs => cs === scope.value) > -1;
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

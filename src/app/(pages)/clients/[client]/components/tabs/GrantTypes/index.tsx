import { FormSection } from "@/components/Form";
import { TabPanel } from "@/components/Tabs";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";

type GrantTypesProps = {
  grant_types?: string[];
};

export default async function GrantTypes(props: Readonly<GrantTypesProps>) {
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const active_grant_types = props.grant_types ?? [];
  const { grant_types_supported } = openIdConfiguration;
  const grant_types = grant_types_supported.map(gt => {
    return {
      name: gt,
      value: !!active_grant_types.find(current => current === gt),
    };
  });

  return (
    <TabPanel>
      <FormSection htmlFor="grant-types-radio" title="Grant Types">
        {grant_types.map(gt => (
          <div key={gt.name} className="flex flex-row gap-1 py-0.5">
            <input
              type="checkbox"
              id={gt.name}
              name={gt.name}
              defaultChecked={gt.value}
            />
            <label htmlFor={gt.name}>{gt.name}</label>
          </div>
        ))}
      </FormSection>
    </TabPanel>
  );
}

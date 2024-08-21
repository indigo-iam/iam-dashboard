import { fetchMe } from "@/services/me";
import { fetchOpenIdConfiguration } from "@/services/openid-configuration";
import { fetchScopes } from "@/services/scopes";

export default async function NewClient() {
  const me = await fetchMe();
  const scopes = await fetchScopes();
  const openIdConfiguration = await fetchOpenIdConfiguration();
  const grantTypes = openIdConfiguration.grant_types_supported;
  return (
    <div className="flex flex-col gap-2">
      <h1>New Clients</h1>
    </div>
  );
}

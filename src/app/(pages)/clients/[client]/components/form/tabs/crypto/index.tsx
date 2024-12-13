import { FormSection } from "@/components/form";
import { TabPanel } from "@/components/tabs";
import { ClientCodeChallenge } from "@/models/client";

export interface PKCEProps extends ClientCodeChallenge {}

function PKCEView(props: Readonly<PKCEProps>) {
  let { code_challenge_method } = props;
  if (code_challenge_method === undefined) {
    code_challenge_method = "none";
  }

  return (
    <FormSection
      htmlFor="pkce-method-select"
      title="Proof Key for Code Exchange (PKCE) challenge method"
    >
      <select
        defaultValue={code_challenge_method}
        className="border bg-transparent p-2"
        id="pkce-method-select"
        name="code_challenge_method"
      >
        <option value="none">No code challenge</option>
        <option value="plain">Plain code challenge</option>
        <option value="S256">SHA-256 hash algorithm</option>
      </select>
    </FormSection>
  );
}

export interface CryptoProps extends PKCEProps {}

export default function Crypto(props: Readonly<CryptoProps>) {
  return (
    <TabPanel unmount={false}>
      <PKCEView {...props} />
    </TabPanel>
  );
}

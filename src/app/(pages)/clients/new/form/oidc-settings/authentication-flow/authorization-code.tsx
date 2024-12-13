import { Field, Label } from "@/components/form";
import { InputList } from "@/components/inputs";
import { Description } from "@headlessui/react";

type AuthorizationCodeProps = {
  onStatusChange: (status: boolean) => void;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { onStatusChange } = props;
  const handleRedirectURIChange = (items: string[]) => {
    onStatusChange(items.length > 0);
  };

  return (
    <Field>
      <Label required>Redirect URIs</Label>
      <Description className="text-xs text-primary/60">
        At least a valid Redirect URI is required when Authorization Code is
        selected.
      </Description>
      <InputList
        originalItems={[]}
        name="redirect_uris"
        type="url"
        placeholder="https://app.exchange.com/callback"
        onChange={handleRedirectURIChange}
        required
      />
    </Field>
  );
}

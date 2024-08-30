import Field from "@/components/Field";
import { InputList } from "@/components/Inputs";
import Label from "@/components/Label";
import { useFormStatus } from "@/utils/forms";
import { Description } from "@headlessui/react";

type AuthorizationCodeProps = {
  formComponentId: string;
};

export default function AuthorizationCode(
  props: Readonly<AuthorizationCodeProps>
) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();
  const handleRedirectURIChange = (items: string[]) => {
    updateFormStatus(formComponentId, items.length > 0);
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

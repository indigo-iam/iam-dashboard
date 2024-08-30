import Description from "@/components/Description";
import Field from "@/components/Field";
import { Input } from "@/components/Inputs";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useFormStatus } from "@/utils/forms";
import { useState } from "react";

type PrivateKeyJwtProps = {
  formComponentId: string;
};

export default function PrivateKeyJwt(props: Readonly<PrivateKeyJwtProps>) {
  const { formComponentId } = props;
  const [jwkMethod, setJwkMethod] = useState<"uri" | "value">("uri");
  const { updateFormStatus } = useFormStatus();

  const changeJwkMethod = (method: "uri" | "value") => {
    setJwkMethod(method);
    updateFormStatus(formComponentId, false);
  };

  const handleJwkChange = (s: string) => {
    updateFormStatus(formComponentId, s.length > 0);
  };

  return (
    <Field>
      <Label required>Public Key Set</Label>
      <Description>
        The JSON Web Keyset for this client. Used for client authentication and
        token encryption. Keys can be provided by reference or by value.
      </Description>
      <div className="flex flex-row gap-2">
        <label htmlFor="jwk-radio-uri">By URI</label>
        <input
          type="radio"
          name="jwk-method-selector"
          id="jwk-radio-uri"
          checked={jwkMethod === "uri"}
          className="my-auto"
          onChange={() => changeJwkMethod("uri")}
        />
        <label htmlFor="jwk-radio-value">By Value</label>
        <input
          type="radio"
          name="jwk-method-selector"
          id="jwk-radio-value"
          checked={jwkMethod === "value"}
          className="my-auto"
          onChange={() => changeJwkMethod("value")}
        />
      </div>
      {jwkMethod === "uri" ? (
        <Input
          name="jwk_uri"
          type="uri"
          title="JSON Web Keyset URI"
          placeholder="https://app.example.org/jwk"
          onChange={e => handleJwkChange(e.target.value)}
          required
        />
      ) : (
        <TextArea
          name="jwk"
          placeholder={'{"keys": []}'}
          onChange={e => handleJwkChange(e.currentTarget.value)}
          required
        />
      )}
    </Field>
  );
}
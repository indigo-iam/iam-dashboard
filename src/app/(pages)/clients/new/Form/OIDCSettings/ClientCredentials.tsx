import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type ClientCredentialsProps = {
  formComponentId: string;
};

export default function ClientCredentials(
  props: Readonly<ClientCredentialsProps>
) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(formComponentId, true);
  }, [formComponentId]);

  return null;
}

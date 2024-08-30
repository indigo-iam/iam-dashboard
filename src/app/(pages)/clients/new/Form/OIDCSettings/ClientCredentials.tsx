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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type ClientSecretPostProps = {
  formComponentId: string;
};

export default function ClientSecretPost(
  props: Readonly<ClientSecretPostProps>
) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(formComponentId, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

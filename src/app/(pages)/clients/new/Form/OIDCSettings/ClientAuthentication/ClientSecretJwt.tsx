import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type ClientSecretJwtProps = {
  formComponentId: string;
};

export default function ClientSecretJwt(props: Readonly<ClientSecretJwtProps>) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(formComponentId, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

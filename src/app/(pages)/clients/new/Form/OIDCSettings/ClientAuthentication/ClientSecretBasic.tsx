import { useFormStatus } from "@/utils/forms";
import { useEffect } from "react";

type ClientSecretBasicProps = {
  formComponentId: string;
};

export default function ClientSecretBasic(
  props: Readonly<ClientSecretBasicProps>
) {
  const { formComponentId } = props;
  const { updateFormStatus } = useFormStatus();

  useEffect(() => {
    updateFormStatus(formComponentId, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

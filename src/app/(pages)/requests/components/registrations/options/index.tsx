import Options from "@/components/options";
import ConfirmButton from "./confirm-button";
import RejectButton from "./reject-button";
import { Registration } from "@/models/registration";

type RegistrationRequestOptionsProps = {
  request: Registration;
};

export default function RegistrationRequestsOptions(
  props: Readonly<RegistrationRequestOptionsProps>
) {
  const { request } = props;
  return (
    <Options>
      <RejectButton request={request} />
      <ConfirmButton request={request} />
    </Options>
  );
}

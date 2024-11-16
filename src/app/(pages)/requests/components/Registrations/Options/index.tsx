import Options from "@/components/Options";
import ConfirmButton from "./ConfirmButton";
import RejectButton from "./RejectButton";
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

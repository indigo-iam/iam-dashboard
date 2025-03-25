import Options from "@/components/options";
import UnlinkOidcAccount from "./unlink";
import { OidcId } from "@/models/indigo-user";

type OidcOptionsProps = {
  oidcId: OidcId;
};

export default function OidcOptions(props: Readonly<OidcOptionsProps>) {
  const { oidcId } = props;
  return (
    <Options>
      <UnlinkOidcAccount oidcId={oidcId} />
    </Options>
  );
}

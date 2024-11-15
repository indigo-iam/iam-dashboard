import Options from "@/components/Options";
import Unlink from "./Unlink";

type SAMLOptionsProps = {};

export default function SAMLOptions(props: Readonly<SAMLOptionsProps>) {
  return (
    <Options>
      <Unlink {...props} />
    </Options>
  );
}

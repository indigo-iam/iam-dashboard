import { Aup } from "@/models/aup";

const calculate = (aup: Aup) => {
  const newDate = new Date(aup.lastUpdateTime as string);
  return new Date(
    newDate.setDate(newDate.getDate() + aup.signatureValidityInDays + 900)
  );
};

export const AupCard = (props: { aup: Aup }) => {
  const { aup } = props;
  const nextSignDate = aup.signatureValidityInDays == 0 ? calculate(aup) : "";
  return (
    <div>
      <h2>
        <b>Acceptable Usage Policy URL</b>
      </h2>
      <a href="{aup?.url}">{aup?.url}</a>
      <h3>
        The URL above is presented to users at registration time or periodically
        if the AUP is configured for periodic reacceptance
      </h3>
      <h2>
        <b>Created</b>
      </h2>
      <h3>{new Date(aup.creationTime).toISOString()}</h3>
      <h2>
        <b>Last updated</b>
      </h2>
      <h3>{new Date(aup?.lastUpdateTime as string)?.toISOString()}</h3>
      <h2>
        <b>Signature Validity (in days)</b>
      </h2>
      <h3>{aup?.signatureValidityInDays}</h3>
    </div>
  );
};

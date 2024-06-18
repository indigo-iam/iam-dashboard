export default function TokenEndpointAuthMethodRadios() {
  const tokenEndpointAuthValues = [
    {
      value: "client_secret_basic",
      label: "Client secret over HTTP basic authentication",
    },
    {
      value: "client_secret_post",
      label: "Client secret over HTTP POST authentication",
    },
    {
      value: "client_secret_jwt",
      label: "Client secret with symmetrically signed JWT assertion",
    },
    {
      value: "private_key_jwt",
      label: "Asymmetrically signed JWT assertion",
    },
    {
      value: "none",
      label: "No authentication",
    },
  ];

  return tokenEndpointAuthValues.map((tokenEndpointAuthValue, index) => (
    <div
      key={tokenEndpointAuthValue.value}
      className="flex flex-row gap-1 py-0.5"
    >
      <input
        type="radio"
        id={tokenEndpointAuthValue.value}
        name="tokenEndpointAuthMethod"
        value={tokenEndpointAuthValue.value}
        defaultChecked={index == 0}
      />
      <label htmlFor={tokenEndpointAuthValue.value}>
        {tokenEndpointAuthValue.label}
      </label>
    </div>
  ));
}

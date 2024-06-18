import Input from "@/components/Input";

export default function JSONWebKeysetURI() {
  return (
    <>
      <Input placeholder="https://app.example.org/jwk" />
      <p className="mt-2 text-xs text-secondary-400">
        URL that points to the public JSON Web Keyset for this client.
      </p>
    </>
  );
}

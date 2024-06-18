export default function PublicKeySet() {
  return (
    <>
      <div className="flex gap-2">
        <div className="space-x-1">
          <input type="radio" id="by-uri-radio" name="by-uri-radio" />
          <label htmlFor="by-uri-radio">By URI</label>
        </div>
        <div className="space-x-1">
          <input type="radio" id="by-value-radio" name="by-value-radio" />
          <label htmlFor="by-value-radio">By value</label>
        </div>
      </div>
      <p className="mt-2 text-xs text-secondary-400">
        The JSON Web Keyset for this client. Used for client authentication and
        token encryption. Keys can be provided by reference or by value.
      </p>
    </>
  );
}

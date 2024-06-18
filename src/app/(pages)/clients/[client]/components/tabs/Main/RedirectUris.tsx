"use client";
import InputList from "@/components/InputList";
import { useState } from "react";

type RedirectUrisProps = {
  redirect_uris?: string[];
};

export default function RedirectUris(props: Readonly<RedirectUrisProps>) {
  const [redirectUris, setRedirectUris] = useState(
    props.redirect_uris ?? ["http://localhost/example"]
  );
  const addRedirectUri = (redirectUri: string) => {
    setRedirectUris([...redirectUris, redirectUri]);
  };
  const removeRedirectUri = (index: number) => {
    setRedirectUris(redirectUris.toSpliced(index, 1));
  };
  return (
    <InputList
      id="redirect-uris-input"
      name="redirect-uris-input"
      placeholder="http://example.com"
      items={redirectUris}
      type="url"
      addItem={addRedirectUri}
      removeItem={removeRedirectUri}
    />
  );
}

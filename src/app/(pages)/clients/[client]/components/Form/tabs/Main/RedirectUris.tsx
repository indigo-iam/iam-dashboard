"use client";
import { InputList } from "@/components/Inputs";
import { useState } from "react";

type RedirectUrisProps = {
  redirect_uris?: string[];
};

export default function RedirectUris(props: Readonly<RedirectUrisProps>) {
  const [redirectUris, setRedirectUris] = useState(
    props.redirect_uris ?? ["http://localhost/example"]
  );
  const addRedirectUri = (redirectUri: string) => {
    if (!redirectUris.find(uri => uri === redirectUri)) {
      setRedirectUris([...redirectUris, redirectUri]);
    } else {
      console.warn("Redirect URI already present");
    }
  };
  const removeRedirectUri = (index: number) => {
    setRedirectUris(redirectUris.toSpliced(index, 1));
  };
  return (
    <InputList
      id="redirect-uris-input"
      name="redirect_uris"
      placeholder="http://example.com"
      items={redirectUris}
      type="url"
      addItem={addRedirectUri}
      removeItem={removeRedirectUri}
    />
  );
}

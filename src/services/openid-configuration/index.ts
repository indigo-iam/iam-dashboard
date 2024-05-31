"use server";
import getConfig from "@/utils/config";
import { OpenIdConfiguration } from "@/models/openid-configuration";

const { BASE_URL } = getConfig();

export const fetchOpenIdConfiguration: () => Promise<OpenIdConfiguration> =
  async () => {
    const response = await fetch(
      `${BASE_URL}/.well-known/openid-configuration`
    );
    return response.json();
  };

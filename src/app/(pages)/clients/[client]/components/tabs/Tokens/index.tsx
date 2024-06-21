import { FormSection } from "@/components/Form";
import Input from "@/components/Input";
import { TabPanel } from "@/components/Tabs";
import {
  AccessTokenSettings,
  DeviceCodeSettings,
  RefreshTokenSettings,
} from "@/models/client";

interface AccessTokenProps extends AccessTokenSettings {}

function AccessToken(props: Readonly<AccessTokenProps>) {
  const {
    access_token_validity_seconds,
    id_token_validity_seconds,
    require_auth_time,
  } = props;
  return (
    <div className="pb-2">
      <FormSection
        htmlFor="access-token-validity-input"
        title="Access Token timeout (seconds)"
      >
        <Input
          name="access-token-validity-input"
          id="access-token-validity-input"
          defaultValue={access_token_validity_seconds}
        />
      </FormSection>
      <FormSection
        htmlFor="id-token-validity-input"
        title="ID Token timeout (seconds)"
      >
        <Input
          name="id-token-validity-input"
          id="id-token-validity-input"
          defaultValue={id_token_validity_seconds}
        />
      </FormSection>
      <div className="mt-4 flex flex-row gap-1">
        <input
          type="checkbox"
          id="require-auth-time-checkbox"
          name="require-auth-time-checkbox"
          defaultChecked={require_auth_time}
        />
        <label className="text-sm" htmlFor={"require-auth-time-checkbox"}>
          Always require authentication time in ID tokens
        </label>
      </div>
    </div>
  );
}

interface RefreshTokenProps extends RefreshTokenSettings {}

function RefreshToken(props: Readonly<RefreshTokenProps>) {
  const {
    refresh_token_validity_second,
    reuse_refresh_token,
    clear_access_tokens_on_refresh,
  } = props;
  return (
    <div className="py-2">
      <FormSection
        htmlFor="refresh-token-validity-input"
        title="Refresh Token timeout (seconds)"
      >
        <Input
          id="refresh-token-validity-input"
          name="refresh-token-validity-input"
          defaultValue={refresh_token_validity_second}
        />
      </FormSection>
      <div className="mt-4 flex flex-row gap-1">
        <input
          type="checkbox"
          id="reuse-refresh-tokens-checkbox"
          name="reuse-refresh-token-checkbox"
          defaultChecked={reuse_refresh_token}
        />
        <label className="text-sm" htmlFor={"require-auth-time-checkbox"}>
          Reuse Refresh Token
        </label>
      </div>
      <div className="mt-4 flex flex-row gap-1">
        <input
          type="checkbox"
          id="clear-access-tokens-on-refresh-checkbox"
          name="clear_access_tokens_on_refresh"
          defaultChecked={clear_access_tokens_on_refresh}
        />
        <label
          className="text-sm"
          htmlFor={"clear-access-tokens-on-refresh-checkbox"}
        >
          Clear Access Tokens on refresh
        </label>
      </div>
    </div>
  );
}

interface DeviceCodeProps extends DeviceCodeSettings {}

function DeviceCode(props: Readonly<DeviceCodeProps>) {
  const { device_code_validity_seconds } = props;
  return (
    <div className="py-2">
      <FormSection
        htmlFor="device-code-validity-input"
        title="Device Code timeout (seconds)"
      >
        <Input
          id="device-code-validity-input"
          name="device-code-validity-input"
          defaultValue={device_code_validity_seconds}
        />
        <p className="mt-2 text-sm text-secondary-400">
          The control is disabled as the client is not authorized for the device
          code grant type.
        </p>
      </FormSection>
    </div>
  );
}

interface TokensProps
  extends AccessTokenProps,
    RefreshTokenProps,
    DeviceCodeProps {}

export default function Tokens(props: Readonly<TokensProps>) {
  return (
    <TabPanel unmount={false} className="gap-4 divide-y-2">
      <AccessToken {...props} />
      <RefreshToken {...props} />
      <DeviceCode {...props} />
    </TabPanel>
  );
}

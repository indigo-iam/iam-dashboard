import { FormSection } from "@/components/Form";
import Checkbox from "@/components/Form/Checkbox";
import { Input } from "@/components/Inputs";
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
          name="access_token_validity_seconds"
          id="access-token-validity-input"
          type="number"
          defaultValue={access_token_validity_seconds}
        />
      </FormSection>
      <FormSection
        htmlFor="id-token-validity-input"
        title="ID Token timeout (seconds)"
      >
        <Input
          name="id_token_validity_seconds"
          id="id-token-validity-input"
          type="number"
          defaultValue={id_token_validity_seconds}
        />
      </FormSection>
      <Checkbox
        name="require_auth_time"
        defaultChecked={require_auth_time}
        label="Always require authentication time in ID tokens"
      />
    </div>
  );
}

interface RefreshTokenProps extends RefreshTokenSettings {}

function RefreshToken(props: Readonly<RefreshTokenProps>) {
  const {
    refresh_token_validity_seconds,
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
          name="refresh_token_validity_seconds"
          defaultValue={refresh_token_validity_seconds}
        />
      </FormSection>
      <Checkbox
        name="reuse_refresh_token"
        defaultChecked={reuse_refresh_token}
        label="Reuse Refresh Token"
      />
      <Checkbox
        name="clear_access_tokens_on_refresh"
        defaultChecked={clear_access_tokens_on_refresh}
        label="Clear Access Tokens on refresh"
      />
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
          type="number"
          id="device-code-validity-input"
          name="device_code_validity_seconds"
          defaultValue={device_code_validity_seconds}
        />
        <p className="mt-2 text-secondary-400">
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

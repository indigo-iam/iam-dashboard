INSERT INTO client_details (
  client_name,
  client_id, 
  client_secret,
  token_endpoint_auth_method,
  access_token_validity_seconds,
  code_challenge_method
) VALUES (
  '$CLIENT_NAME', 
  '$CLIENT_ID',
  '$CLIENT_SECRET',
  'SECRET_BASIC',
  3600,
  'S256'
);
SET @owner_id=(SELECT id from client_details WHERE client_id='$CLIENT_ID');
INSERT INTO client_grant_type (
  owner_id,
  grant_type
) VALUES (
  @owner_id,
  'authorization_code'
);
INSERT INTO client_scope (
  owner_id,
  scope
) VALUES 
  (@owner_id, 'openid'),
  (@owner_id, 'email'),
  (@owner_id, 'profile'),
  (@owner_id, 'scim:read'),
  (@owner_id, 'scim:write'),
  (@owner_id, 'iam:admin.read'),
  (@owner_id, 'iam:admin.write');
INSERT INTO client_redirect_uri (
  owner_id,
  redirect_uri
) VALUES (
  @owner_id,
  '$REDIRECT_URI'
)

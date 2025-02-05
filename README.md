# INDIGO IAM Dashboard

[![github-build-status](https://github.com/indigo-iam/iam-dashboard/actions/workflows/ci.yaml/badge.svg?branch=main&event=push)](https://github.com/indigo-iam/iam-dashboard/actions/workflows/ci.yaml)
[![sonarqube-qg](https://sonarcloud.io/api/project_badges/measure?project=indigo-iam_iam-dashboard&metric=alert_status)](https://sonarcloud.io/dashboard?id=indigo-iam_iam-dashboard)

INDIGO IAM Dashboard is the web application of INDIGO IAM developed by INFN.

## Introduction

The dashboard is implemented in [TypeScript](https://www.typescriptlang.org),
using [React](https://react.dev) and [Next.js](https://nextjs.org).
OpenID Connect/OAuth2 authorization flow is handled by
[Auth.js](https://authjs.dev).

In order to run the web application, **working INDIGO IAM instance is required**.

## IAM Client Configuration

The dashboard acts as a INDIGO IAM Login Service client and thus, registering
the client is required to receive an access token.

To register a new client, go to the chosen INDIGO IAM instance, login as admin
and create a new client with the configuration described below.

### Redirect URIs

In the client main page, add all needed redirect uris, in the form of
`<IAM_URL>/auth/callback/indigo-iam` (without the trailing `/`).

To enable development of the dashboard on your local machine, the redirect uri
must be

```shell
http://localhost:3000/auth/callback/indigo-iam
```

For a production deployment, the redirect uri will be, for example

```shell
https://iam-dashboard.cloud.cnaf.infn.it/auth/callback/indigo-iam
```

where [https://iam-dashboard.cloud.cnaf.infn.it](https://iam-dashboard.cloud.cnaf.infn.it)
is the URL where the dashboard is located.

### Scopes

In the *Scopes* tab, assure that the following scopes are enabled

- `email`
- `openid`
- `profile`
- `scim:read`
- `scim:write`
- `iam:admin.read`
- `iam:admin.write`

### Grant Types

In the *Grant Types* tab, enable `authorization_code`.
Finally, in the **Crypto** section, enable PKCE with SHA-256 has algorithm.

## Development

To launch the development environment, an installation of
[Node.js](https://nodejs.org/en) is the only mandatory requirement.
This project currently relies upon Node 22 LTS.

### Create the `.env` file

Create a file named `.env` located to the project root directory and define the
following variables:

```shell
# .env
NODE_ENV=debug
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it # or http://localhost:8081
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
IAM_SCOPES="openid profile scim:read scim:write iam:admin.read iam:admin.write"
AUTH_SECRET=<authentication_secret>                  # see below
```

**Imporant**: `AUTH_SECRET` is a variable to securely protect session cookies
for authentication. You could generate a secret running

```shell
openssl rand -base64 32
```

> **Note** this is considered a sensitive credentials do decrypt session cookies
> and thus the Access Token. Do not share the secret especially the once
> generated for production deployment.

### Local development

First install the required dependencies with

```shell
npm run install
```

and then start the Next.js development server running

```shell
npm run dev
```

Something similar to the following should be prompted:

```bash
> iam-dashboard@0.1.0 dev
> next dev

  ▲ Next.js 14.2.2
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 9.5s
 ```

The dashboard is then available at [http://localhost:3000](http://localhost:3000).

## Deployment

A Docker image is automatically built using GitHub Action.
The same environment variables are required, plus the `AUTH_URL` variable. The
latter is need when the application is behind a docker image or proxy which
hides the current hostname.

Create the following environment file, giving your preferred name, for example
`prod.env`

```bash
# prod.env
NODE_ENV=production
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
IAM_SCOPES="openid profile scim:read scim:write iam:admin.read iam:admin.write"
AUTH_SECRET=<authentication_secret>
AUTH_URL=<dashboard_hostname>  # e.g. https://iam-dashboard.cloud.cnaf.infn.it
```
To start the application run

```bash
docker run -p <some-port>:80 --env-file=prod.env cnafsoftwaredevel/iam-dashboard:latest
```

## TODOs

### General

- [ ] Sudo mode (panic!)
- [ ] Add Table component

### Home page

- [ ] Validate password before submission
- [ ] What happens if I change password when there is no password at all?
- [x] Finish the "Add to group" functionality
- [x] Add "Change membership end time"
- [ ] Add "Link external account" feature
- [x] Add "Link Certificate"
- [ ] Add "Request Certificate"
- [ ] Add "Add managed proxy certificate"
- [x] Add "Add ssh key"
- [x] Add "Set attribute"

### Users Page

- [x] Create the users table
- [x] Add "Delete user" button per each row
- [ ] Maybe add a multiple selection to delete multiple users in bulk

### Groups Page

- [x] Create the groups page
- [x] Add "Add Root Group" feature
- [x] Add "Add Subgroup" button per each row
- [x] Add "Delete Group" button per each row

### Requests Page

- [x] Create "Registration Request" tab
- [X] Create "Group requests" tab

### AUP Page

- [x] Add "Edit AUP"
- [x] Add "Request AUP Signature"
- [x] Add "Delete AUP"

### Clients Page

- [x] Add Clients table
- [x] Add "New Client"
- [x] Add "Edit client" per each row
- [x] Add "Delete client" per each row
- [x] Add Client "edit" page with tabs (todo, form submission):
  - [x] Main (client name, client id, client description, redirect URIs, contacts, etc)
  - [x] Credentials (Token endpoint auth method, client secret, registration access token, regenerate registration a.c., Public key set, JWK URI)
  - [x] Scopes (System scope, Custom scope)
  - [x] Grant types
  - [x] Tokens (A.T. timeout, ID T. timeout, R.T settings & timeout, Device code timeout)
  - [x] Crypto (PKCE settings)
  - [x] Other info (Homepage URL, ToS, Policy)
  - [ ] Owners (Show owners, assign owner)

### Tokens Page

- [ ] TBD

### Scopes

- [x] Add Scopes table
- [x] Add "Edit Scope" button per each row (Description, default scope, restricted)
- [x] Add "Delete scope" button per each row

# INDIGO IAM Dashboard

[![github-build-status](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml/badge.svg?branch=main&event=push)](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml)

INDIGO IAM Dashboard is the web application of INDIGO IAM developed by INFN.

## Introduction

The dashboard is implemented in [TypeScript](https://www.typescriptlang.org),
using [React](https://react.dev) and [Next.js](https://nextjs.org).
The OpenID Connect authorization flow is handled by [Auth.js](https://authjs.dev)

## Development

Even though not strictly necessary, it is highly recommended to use VSCode with
the [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
integration.

This project is provided with a [`docker-compose.yaml`](docker-compose.yaml)
which runs the following services

- `iam-backend`: INDIGO IAM backend (and old dashboard)
- `iam-database`: MySQL instance for IAM backend
- `iam-dashboard`: the new dashboard (core of this project)
- `iam-nginx`: NGINX proxy pass instance which route the traffic between services

### Start the services

It is possible to start all services from within VSCode, launching the command
`Reopen in Container`. Otherwise, it is possible to manually start the services
with

```bash
docker compose up -d
```
and then, in VSCode, attach the session with `Attach to Running Container...`

### Prepare the environment

The application needs `.env` file to setup some configuration variables.
For development define the following variables:

```shell
# .env
NODE_ENV=debug
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it # or http://localhost:8080
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
AUTH_SECRET=<authentication_secret>                  # see below
```

`AUTH_SECRET` is a variable to securely protect session cookies for
authentication. You could generate a secret running

```shell
openssl rand -base64 32
```

### Start the development server

After launching the services, from VSCode, **within** the `iam-dashboard`
container, start the development server

```bash
npm run dev
```

Something similar to the following should be prompted:

```bash
node ➜ /workspace (main) $ npm run dev
```

## IAM Client Configuration

The dashboard acts as client for IAM backend and thus, registering the client is
required. This step is required the first time only, and whenever the database
volume is deleted/recreated.

To register a new client, go to
[http://localhost:8081/](http://localhost:8081) to load the old dashboard, or go
to your production IAM instance.
Login as admin and register a new client. Give it a name, such as
`iam-dashboard` and add the
[\<IAM_URL\>/auth/callback/indigo-iam](\<IAM_URL\>/auth/callback/indigo-iam)


(without the trailing `/`) URL to the Redirect URIs.
In **Scopes**, assure that the following scopes are enabled

- `email`
- `offline_access`
- `openid`
- `profile`
- `scim:read`
- `scim:write`

In **Grant Types**, enable `authorization_code`.
Finally, in the **Crypto** section enable PKCE with SHA-256 has algorithm.
Save the client and copy `client_id` and `client_secret`, then edit the
`envs/dev.env` file replacing `IAM_CLIENT_ID` with the
correct values.

## Deployment

A Docker image is automatically built using GitHub Action. As for development,
the same environment variables are required, plus the `AUTH_URL` variable. The
latter is need when the application is behind a docker image or proxy which
hides the current hostname.

Create the following environment file, giving your preferred name, for example
`prod.env`

```bash
# prod.env
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it # or http://localhost:8080
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
AUTH_SECRET=<authentication_secret>
AUTH_URL=<dashboard_hostname>  # e.g. https://iam-dashboard.cloud.cnaf.infn.it
```
To start the application then run

```bash
docker run -p <some-port>:80 --env-file=prod.env cnafsoftwaredevel/iam-dashboard:latest
```

# TODOs

## General
- [ ] Sudo mode (panic!)
- [ ] Add Table component

## Home page
- [ ] Validate password before submission
- [ ] Whats happen if I change password when there is no password at all?
- [ ] Finish the "Add to group" functionality
- [ ] Add "Change membership end time"
- [ ] Add "Link external account" feature
- [ ] Add "Link Certificate"
- [ ] Add "Request Certificate"
- [ ] Add "Add managed proxy certificate"
- [ ] Add "Add ssh key"
- [ ] Add "Set attribute"

## Users Page
- [ ] Create the users table
- [ ] Add "Delete user" button per each row
- [ ] Maybe add a multiple selection to delete multiple users in bulk

## Groups Page
- [ ] Create the groups page
- [ ] Add "Add Root Group" feature
- [ ] Add "Add Subgroup" button per each row (?!)
- [ ] Add "Delete Group" button per each row

## Requests Page

- [ ] Create "Registration Request" tab
- [ ] Create "Group requests" tab

## AUP Page
- [ ] Add "Edit AUP"
- [ ] Add "Request AUP Signature"
- [ ] Add "Delete AUP"

## Clients Page
- [ ] Add Clients table
- [ ] Add "New Client"
- [ ] Add "Edit client" per each row
- [ ] Add "Delete client" per each row
- [ ] Add Client "edit" page with tabs:
  - [ ] Main (client name, client id, client description, redirect URIs, contacts, etc)
  - [ ] Credentials (Token endpoint auth method, client secret, registration access token, regenerate registration a.c., Public key set, JWK URI)
  - [ ] Scopes (System scope, Custom scope)
  - [ ] Grant types
  - [ ] Tokens (A.T. timeout, ID T. timeout, R.T settings & timeout, Device code timeout)
  - [ ] Crypto (PKCE settings)
  - [ ] Other info (Homepage URL, ToS, Policy)
  - [ ] Owners (Show owners, assign owner)

## Tokens Page
- [ ] ???

## Scopes
- [ ] Add Scopes table
- [ ] Add "Edit Scope" button per each row (Description, default scope, restricted)
- [ ] Add "Delete scope" button per each row

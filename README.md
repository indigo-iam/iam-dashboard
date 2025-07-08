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

Development can be done locally (see below) or using Dev Containers which
provides an already prepared environment.

### Dev Containers

#### Hosts file

Before using Dev Containers, add `iam.test.example` to the localhost entry
in your `/etc/hosts` file pointing to the localhost ip.

It should look like the following

```shell
# /etc/hosts
...
127.0.0.1       localhost iam.test.example
...
```

#### Start the project

Open the project with VS Code and click "Open in container".

When the environment is ready, open a Terminal within the dev container, install
the dependencies with

```shell
npm install
```

and the run the application with

```shell
npm run dev
```

Now the dashboard is reachable at the address
http://iam.test.example:8080/development.

## Local development

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
AUTH_TRUST_HOST=true
```
To start the application run

```bash
docker run -p <some-port>:80 --env-file=prod.env cnafsoftwaredevel/iam-dashboard:latest
```

### Base Path

To deploy a Next.js application under a sub-path of a domain you can use the
`basePath` [config option](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath).

The `basePath` variable is read at *build time* and thus the dashboard must be
compiled for each different `basePath`. It is possible to change the `basePath`
variable using the `--build-arg NEXT_PUBLIC_BASE_PATH` Docker argument.

For example, to deploy your application with the `/dashboard` using the sub-path
run

```shell
docker build . -t iam-dashboard --build-arg NEXT_PUBLIC_BASE_PATH=/dashboard
```

## Deployment with Reverse Proxy

This project provides a deployment model example base on Docker Compose.
The setup is consists in the following micro-services:

 - IAM Login Service
 - MySQL
 - IAM Dashboard
 - NGINX

Before launching the deployment, add `iam.test.example` es explained in
[Hosts file](#hosts-file) section.

Start the deployment with `docker compose up -d`. The old INDIGO IAM dashboard
is now reachable at `iam.test.example:8080`. Create a new client a describe in
the [IAM Client Configuration](#iam-client-configuration) section.

Now create a `.local.env` file as described in
[Create the env file](#create-the-env-file) section. It should look like

```ini
NODE_ENV=production
IAM_AUTHORITY_URL=http://iam.test.example:8080
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
IAM_SCOPES="openid profile scim:read scim:write iam:admin.read iam:admin.write"
AUTH_SECRET=<authentication_secret>
AUTH_TRUST_HOST=true
```
Now restart the deployment running

```shell
docker compose down
docker compose up -d
```

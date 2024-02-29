# INDIGO IAM Dashboard

[![github-build-status](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml/badge.svg?branch=main&event=push)](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml)

INDIGO IAM Dashboard is the web application of INDIGO IAM developed by INFN.

## Introduction

The dashboard is implemented in [TypeScript](https://www.typescriptlang.org),
using [React](https://react.dev) and
[React Bootstrap](https://react-bootstrap.github.io).
The OpenID Connect authorization flow is handled by
[oidc-client-ts](https://authts.github.io/oidc-client-ts/) and its wrapper
[react-oidc-context](https://github.com/authts/react-oidc-context?tab=readme-ov-file).

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

### Start the development server

After launching the services, from VSCode, **within** the `iam-dashboard`
container, start the development server

```bash
npm run dev
```

Something similar to the following should be prompted:

```bash
node ➜ /workspace (main) $ npm run dev

> iam-dashboard@0.0.0 dev
> ./init_env.sh && vite

Initialize environment variables

  VITE v5.1.0  ready in 509 ms

  ➜  Local:   http://localhost:3000/iam-dashboard
  ➜  Network: http://172.18.0.4:3000/iam-dashboard
  ➜  press h + enter to show help
```

## Configuration (First Run)

The dashboard acts as client for IAM backend and thus, registering the client is
required. This step is required the first time only, and whenever the database
volume is deleted/recreated.

As first step, you must provide a valid env file, otherwise the deployment will
fail. Copy the example environment file

```bash
cp envs/dev.env.example envs/dev.env
```

and then start the services with `docker compose up -d`. Once everything is
up, it is possible to register a new client.

To register a new client, go to
[http://localhost:8080/dashboard](http://localhost/dashboard) to load the old
dashboard. Login as admin and register a new client. Give it a name, such as
`iam-dashboard` and add the [http://localhost:8080](http://localhost:8080)
(without the trailing `/`) URL to the Redirect URIs.
In **Scopes**, assure that the following scopes are enabled

- `email`
- `offline_access`
- `openid`
- `profile`

In **Grant Types**, enable `authorization_code`.
Finally, in the **Crypto** section enable PKCE with SHA-256 has algorithm.
Save the client and copy `client_id` and `client_secret`, then edit the
`envs/dev.env` file replacing `IAM_CLIENT_ID` and `IAM_CLIENT_SECRET` with the
correct values.

To load the modified environment file, recreate the deployment with

```bash
docker compose down && docker compose up -d
```

Now it is possible to login and access to the new dashboard located at
[http://localhost:8080/new-dashboard](http://localhost:8080/new-dashboard).

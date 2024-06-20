# INDIGO IAM Dashboard

[![github-build-status](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml/badge.svg?branch=main&event=push)](https://github.com/indigo-iam/iam-dashboard/actions/workflows/release.yaml)

INDIGO IAM Dashboard is the web application of INDIGO IAM developed by INFN.

## Introduction

The dashboard is implemented in [TypeScript](https://www.typescriptlang.org),
using [React](https://react.dev) and [Next.js](https://nextjs.org).
The OpenID Connect authorization flow is handled by [Auth.js](https://authjs.dev).

In order to run the web application, **working INDIGO IAM instance is required**.
It is possible to run the dashboard against both a remote IAM instance or, 
a local IAM instance using Docker containers.
This project is shipped with a [`docker-compose.yaml`](docker-compose.yaml)
that runs a local instance of INDIGO IAM. See the following sections for 
instructions.

## IAM Client Configuration

The dashboard acts as client for IAM backend and thus, registering the client is
required. This step is required the first time only (or whenever the local 
database volume is deleted/recreated).

To register a new client, go to the chosen IAM instance
([http://localhost:8081/](http://localhost:8081) for the local instance).
Login as admin, register a new client and configure it as described below.

### Redirect URIs

In the client main page, add all needed redirect uris, in the form of
`<IAM_URL>/auth/callback/indigo-iam`
(without the trailing `/`).

To be able to develop the dashboard on your local machine, the redirect uri must
be

```shell
http://localhost:8080/auth/callback/indigo-iam
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

### Grant Types

In the *Grant Types* tab, enable `authorization_code`.
Finally, in the **Crypto** section enable PKCE with SHA-256 has algorithm.

## Development

To launch the development environment, an installation of
[Node.js](https://nodejs.org/en) is the only mandatory requirement.
This project currently relies upon Node 20 LTS.

Regardless the chosen method, an environment file is required to the dashboard
about which IAM it should use.

### Create the `.env` file

Create a file named `.env` located to the root directory of this repository and
define the following variables:

```shell
# .env
NODE_ENV=debug
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it # or http://localhost:8081
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
AUTH_SECRET=<authentication_secret>                  # see below
```

`AUTH_SECRET` is a variable to securely protect session cookies for
authentication. You could generate a secret running

```shell
openssl rand -base64 32
```

> **Note:** If you want to use the local IAM instance, and thus you don't have a
> client yet, start the services (see below), create a new clint (see above) and
> finally create the `.env` file with the proper values.

### Local development (remote IAM only)

The simplest way to quick start the application requires Node.js only.
Be aware that with this method *a remote INDIGO IAM instance is required*.

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
> next dev -p 8080

  ▲ Next.js 14.2.2
  - Local:        http://localhost:8080
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 9.5s
 ```

The dashboard is then available at [http://localhost:8080](http://localhost:8080).

### Dev Containers

Even though not strictly necessary, it is highly recommended to use
Visual Studio Code with the [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
integration.

This project is provided with a [`docker-compose.yaml`](docker-compose.yaml)
that spawns the following services

- `iam-backend`: INDIGO IAM backend (and old dashboard)
- `iam-database`: MySQL instance for IAM backend
- `iam-dashboard`: the new dashboard (core of this project)
- `iam-nginx`: NGINX proxy pass instance which route the traffic between services

#### Start the services

If you open this project with Visual Studio Code, it should automatically
suggest to reopen the project using the containers functionality.

If this is not the case, it is possible to start all services from within Visual
Studio Code, launching the command `Reopen in Container`.
Otherwise, it is possible to manually start the services with

```bash
docker compose up -d
```
and then, in Visual Studio Code, attach the session with
`Attach to Running Container...`

#### Start the Next.js development server

After launching the services, from **inside** the
`iam-dashboard` container, start the development server

```bash
npm run dev
```

The dashboard is then available at
[http://localhost:8080](http://localhost:8080), while the INDIGO IAM instance
is located at [http://localhost:8081](http://localhost:8081).

#### Docker compose

This method is very similar to the Dev Containers method, since they share
the same [`docker-compose.yaml`](docker-compose.yaml) file to declare all the
services. This method has just few caveats, compared to Dev Containers that
require a couple of additional steps.

#### Start the Next.js development server

As first step, start the services with `docker compose` as shown before

```shell
docker compose up -d
```

Now you have to enter the container interactively with

```shell
docker exec -it iam-dashboard bash
```

Navigate to the `/workspace` directory. This directory is mounted to
your local project directory. From here, install the dependencies and 
start the Next.js development server with

```shell
# in /workspace dir
npm run install     # not required with dev containers
npm run dev
```

## Deployment

A Docker image is automatically built using GitHub Action. As for development,
the same environment variables are required, plus the `AUTH_URL` variable. The
latter is need when the application is behind a docker image or proxy which
hides the current hostname.

Create the following environment file, giving your preferred name, for example
`prod.env`

```bash
# prod.env
IAM_AUTHORITY_URL=https://iam-dev.cloud.cnaf.infn.it
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
AUTH_SECRET=<authentication_secret>
AUTH_URL=<dashboard_hostname>  # e.g. https://iam-dashboard.cloud.cnaf.infn.it
```
To start the application then run

```bash
docker run -p <some-port>:80 --env-file=prod.env cnafsoftwaredevel/iam-dashboard:latest
```

## TODOs

### General

- [ ] Sudo mode (panic!)
- [ ] Add Table component

### Home page

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

### Users Page

- [ ] Create the users table
- [ ] Add "Delete user" button per each row
- [ ] Maybe add a multiple selection to delete multiple users in bulk

### Groups Page

- [ ] Create the groups page
- [ ] Add "Add Root Group" feature
- [ ] Add "Add Subgroup" button per each row (?!)
- [ ] Add "Delete Group" button per each row

### Requests Page

- [ ] Create "Registration Request" tab
- [ ] Create "Group requests" tab

### AUP Page

- [ ] Add "Edit AUP"
- [ ] Add "Request AUP Signature"
- [ ] Add "Delete AUP"

### Clients Page

- [x] Add Clients table
- [x] Add "New Client"
- [x] Add "Edit client" per each row
- [ ] Add "Delete client" per each row
- [ ] Add Client "edit" page with tabs (todo, form submission):
  - [x] Main (client name, client id, client description, redirect URIs, contacts, etc)
  - [x] Credentials (Token endpoint auth method, client secret, registration access token, regenerate registration a.c., Public key set, JWK URI)
  - [x] Scopes (System scope, Custom scope)
  - [x] Grant types
  - [x] Tokens (A.T. timeout, ID T. timeout, R.T settings & timeout, Device code timeout)
  - [x] Crypto (PKCE settings)
  - [x] Other info (Homepage URL, ToS, Policy)
  - [ ] Owners (Show owners, assign owner)

### Tokens Page

- [ ] ???

### Scopes

- [ ] Add Scopes table
- [ ] Add "Edit Scope" button per each row (Description, default scope, restricted)
- [ ] Add "Delete scope" button per each row

# INDIGO IAM Dashboard

[![github-build-status](https://github.com/indigo-iam/iam-dashboard/actions/workflows/ci.yaml/badge.svg?branch=main&event=push)](https://github.com/indigo-iam/iam-dashboard/actions/workflows/ci.yaml)
[![sonarqube-qg](https://sonarcloud.io/api/project_badges/measure?project=indigo-iam_iam-dashboard&metric=alert_status)](https://sonarcloud.io/dashboard?id=indigo-iam_iam-dashboard)

INDIGO IAM Dashboard is the web application of INDIGO IAM developed by INFN.

## Introduction

The dashboard is implemented in [TypeScript](https://www.typescriptlang.org),
using [React](https://react.dev) and [Next.js](https://nextjs.org).
OpenID Connect/OAuth2 authorization flow is handled by
[Better Auth](https://www.better-auth.com).

## IAM Configuration

In order to support the dashboard, IAM login service must be initialized with
the following environment variables enabled:

```shell
IAM_DASHBOARD_ENABLED: true
IAM_ACCESS_TOKEN_INCLUDE_SCOPE: true
IAM_SCIM_INCLUDE_AUTHORITIES: true
```

### Client Configuration

The dashboard acts as a INDIGO IAM Login Service OpenID Connect/OAuth2 client
and thus, a registered client is required to receive an access token.

To register a new client, go to the chosen INDIGO IAM instance, login as admin
and create a new client with the configuration described below.

#### Redirect URIs

In the client main page, add all needed redirect uris, in the form of
`<IAM_DASHBOARD_URL>/api/oauth2/callback/indigo-iam` (without the trailing `/`).

To enable development of the dashboard on your local machine, the redirect uri
must be:

```text
http://localhost:3000/auth/oauth2/callback/indigo-iam
```

For a production deployment, the redirect uri will be, for example:

```text
https://iam-dev.cloud.cnaf.infn.it/ui/auth/oauth2/callback/indigo-iam
```

where https://iam-dev.cloud.cnaf.infn.it/ui is the URL where the dashboard is
located (see following sections for changing the `basePath` parameter).

#### Scopes

In the _Scopes_ tab, assure that the following scopes are enabled:

- `email`
- `openid`
- `profile`
- `scim:read`
- `scim:write`
- `iam:admin.read`
- `iam:admin.write`

#### Grant Types

In the _Grant Types_ tab, enable `authorization_code`.
Finally, in the **Crypto** section, enable PKCE with SHA-256 has algorithm.

## Deployment

A Docker image is automatically built using GitHub Action and available on
[Docker Hub](https://hub.docker.com/r/cnafsoftwaredevel/iam-dashboard/tags) for
`basePath` equal to `/ui` (see section below).

### IAM_DASHBOARD_AUTH_SECRET

`IAM_DASHBOARD_AUTH_SECRET` is a variable to securely protect session cookies
for authentication. You could generate a secret key by running:

```bash
openssl rand -base64 32
```

> **Note** this is considered a sensitive credentials do decrypt session cookies
> and thus the Access Token. Do not share the secret especially the once
> generated for production deployment.

### IAM Dashboard Configuration

Create `.env` file similar to:

```bash
IAM_API_URL=https://iam-dev.cloud.cnaf.infn.it
IAM_DASHBOARD_BASE_URL=https://iam-dev.cloud.cnaf.infn.it
IAM_DASHBOARD_BASE_PATH=/ui
IAM_DASHBOARD_CLIENT_ID="<your_client_id>"
IAM_DASHBOARD_CLIENT_SECRET="<your_client_secret>"
IAM_DASHBOARD_AUTH_SECRET="<authentication_secret>"
IAM_DASHBOARD_OTEL_EXPORTER_OTLP_ENDPOINT="https://your.otel.example/collector"
IAM_DASHBOARD_ORGANIZATION_NAME="INFN DataCloud"       # default "cnafsd"
IAM_DASHBOARD_POLICY_URL=https://example.org/policy    # default undefined
IAM_DASHBOARD_SUPPORT_URL=https://example.org/support  # default undefined
```

To start the application execute:

```bash
docker run -p <some-port>:80 --env-file=prod.env cnafsoftwaredevel/iam-dashboard:latest
```

### Base Path

To deploy a Next.js application under a different path of a domain you can use
the `basePath`
[configuration option](https://nextjs.org/docs/pages/api-reference/config/next-config-js/basePath).

The `basePath` variable is read at _build time_ and thus the dashboard must be
compiled for each different `basePath`.

It is possible to change the `basePath`
variable using the `--build-arg IAM_DASHBOARD_BASE_PATH=<path>` Docker argument.

For example, to deploy your application with the `/ui` using the sub-path
run:

```bash
docker build . -t iam-dashboard --build-arg IAM_DASHBOARD_BASE_PATH=/ui
```

## Development

Development can be done locally or using Dev Containers that provide an already
prepared environment.

### Preparation

Independently from you preferred development method, local or via Dev Containers,
it is required to register a valid domain in your `/etc/hosts` file or
equivalent, create a self-signed Certificate Authority and Private Key and
Public Certificate for TLS termination.
The next sections describe how to setup the domain name and register custom
certificates.

#### Hosts file

In order to use TLS, a domain name must be registered in your local DNS entry.
For Linux and Mac, add `iam.test.example` to the localhost entry in your
`/etc/hosts` file pointing to the localhost ip.

It should look like the following:

```bash
# /etc/hosts
...
127.0.0.1       localhost iam.test.example
...
```

#### TLS Termination

Before launching the deployment, add `iam.test.example` es explained in
[Hosts file](#hosts-file) section.

Now, create a self-signed certificate authority and certificate by running:

```bash
scripts/trust/setup_trust.sh assets/trust
```

This will generate the following files in the `assets/trust` directory:

```bash
assets/trust
├── star_test_example.cert.pem
├── star_test_example.key.pem
└── star_test_example_ca.pem
```

#### Generate `.env` file

Since Indigo IAM v1.14.0, a client for the dashboard is automatically registered
during boot whenever the `IAM_DASHBOARD_CLIENT_ID` and
`IAM_DASHBOARD_CLIENT_SECRET` variables are exported. To create a `.env` file
run the following commands:

```bash
export IAM_DASHBOARD_CLIENT_ID=$(uuid)
export IAM_DASHBOARD_CLIENT_SECRET=$(pwgen -1 32)
export IAM_DASHBOARD_AUTH_SECRET=$(openssl rand -base64 32)
envsubst < .template.env > .env
```

#### Add `redirect_uri`s

The NGINX reverse proxy shipped with this project, provides the following routes:

- https://iam.test.example/ui
- https://iam.test.example/dev
- https://iam.test.example/devcontainer

The `/ui` base path is used for end-to-end tests of the final docker image built
for production IAM login service configure automatically the correct client.
To enable the `/dev` and `/devcontainer` `redirect_uri`s:

1. start the docker compose
2. navigate to https://iam.test.example/ui and login with admin credentials
3. enable the "Admin mode" and go to the Clients page.
4. Search the `The INDIGO IAM dashboard` client
5. Go to the Grant Types and add all the required redirect uris:
   `https://iam.test.example/<BASE_URL>/api/auth/oauth2/callback/indigo-iam`
   where `<BASE_URL>` can be `/dev` or `/devcontainer`.
6. Save the client changes
7. Edit your the `IAM_DASHBOARD_BASE_PATH` variable in your `.env` file
   accordingly

> Note: every time the IAM login service container is removed, for example with
> `docker compose down`, the redirect uris must be reconfigured.

### Dev Containers

This project provides a ready to use development environment by using Dev
Containers. It is has been tested with VS Code and Zed IDEs.

#### Start the project

Open the project with VS Code and click "Open in container".

When the environment is ready, create the `.env` file in the root of the
project with like:

```bash
IAM_API_URL=https://iam.test.example
IAM_DASHBOARD_BASE_URL=https://iam.test.example
IAM_DASHBOARD_BASE_PATH=/devcontainer                    # note the base path
IAM_DASHBOARD_CLIENT_ID=1d70f1a4-d38f-44be-811d-98e25d574431
IAM_DASHBOARD_CLIENT_SECRET=uet2ohchohgh9aiRoh9Pei1odahngak3
IAM_DASHBOARD_AUTH_SECRET=mHkwsMan8G6REekPvvzsMFPg594nUfkgmZRBcQV3SzQ=
```

Then install the dependencies with:

```bash
npm install # or npm ci
```

Before starting the application, instruct the Node runtime to use the
self-signed Certificate Authority:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
```

Start the application by running:

```bash
npm run dev
```

Something similar to the following should be prompted:

```bash
iam-dashboard@0.1.0 dev
next dev

  ▲ Next.js 14.2.2
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 9.5s
```

The old IAM Login Service dashboard is available at https://iam.test.example
while the new dashboard is reachable at https://iam.test.example/devcontainer.

#### Shutdown all containers

When closing the devcontainer, it should call `docker compose down` to
gracefully close all services. It this does not happen, to shut down all
the services execute:

```bash
docker compose down --remove-orphans
```

### Local development

To launch the development environment, an installation of
[Node.js](https://nodejs.org/en) is the only mandatory requirement.
This project currently relies upon Node 24 LTS.

#### Configuration

This project provides a [`docker-compose.yaml`](docker-compose.yaml) file
to start an instance of INDIGO IAM Login Service, MySQL and NGINX. This
allows the development of the dashboard using an environment mostly similar
to a production environment, with a reverse proxy to properly forward traffic
IAM Login Service and IAM Dashboard upstreams. It also provides TLS termination.

To start the services in background execute:

```bash
docker compose up -d
```

Create a file named `.env` located to the project root directory and define the
following variables:

```bash
IAM_API_URL=https://iam.test.example
IAM_DASHBOARD_BASE_URL=https://iam.test.example
IAM_DASHBOARD_BASE_PATH=/dev                    # note the base path
IAM_DASHBOARD_CLIENT_ID=uet2ohchohgh9aiRoh9Pei1odahngak3
IAM_DASHBOARD_CLIENT_SECRET=35971fb2-d6e7-4180-9330-6b3b842f04c4
IAM_DASHBOARD_AUTH_SECRET=mHkwsMan8G6REekPvvzsMFPg594nUfkgmZRBcQV3SzQ=
```

First install the required dependencies with:

```bash
npm install # or npm ci
```

and then start the Next.js development server running:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
npm run dev
```

Something similar to the following should be prompted:

```bash
iam-dashboard@0.1.0 dev
next dev

  ▲ Next.js 14.2.2
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 9.5s
```

The old IAM Login Service dashboard is available at https://iam.test.example
while the new dashboard is reachable at https://iam.test.example/dev.

### End-to-end tests with Reverse Proxy (E2E)

End-to-end (E2E) tests are written using [Playwright](https://playwright.dev)
testing framework.

In order to test every aspect of the frontend, as well as the backend side
and the reverse proxy, the docker compose project compiles the dashboard and
builds an image called `iam-dashboard:test`, located at https://iam.test.example/ui.
By default, Playwright will run tests against the `https://iam.test.example/ui`
endpoint, to the the final image that will be built during the CI/CD pipeline.

#### Install Playwright browsers

To run the tests, Playwright browser must be installed first, or on your local
machine or inside the Dev Container.

To install the browsers, run:

```bash
npx playwright install --with-deps
```

#### Run the tests against built image

The CI/CD pipeline performs end-to-end tests each time a new commit is pushed
to the remote origin. To perform the system tests, IAM Dashboard must be
compiled and packaged in a docker image.
The [docker-compose](./docker-compose.yaml) file builds an image called
`iam-dashboard:test` which Playwright run tests against.

To run the test suite, first start the docker compose deployment with the
`--build` parameter, in order to freshly build the IAM Dashboard:

```bash
docker compose up -d --build
```

**Note** everything the source code is changed, the `iam-dashboard:test` image
needs to be rebuilt.

To run the tests with the command line:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
npx playwright test
```

or using the Playwright's UI mode:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
npx playwright test --ui
```

To update the image, first shutdown the deployment and restart it with the
`--build` flag:

```bash
docker compose down [-v]
docker compose up -d --build
```

#### Run tests in local development mode

It is possible to run tests on the local development mode started by
`npm run dev`.

Make sure the properly configure the `.env` as described in the above sections,
using the following variables:

```bash
IAM_API_URL=https://iam.test.example
IAM_DASHBOARD_BASE_URL=https://iam.test.example
IAM_DASHBOARD_BASE_PATH=/dev
```

Start the application in one shell with:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
npm run dev
```

and run tests in other shell with:

```bash
export NODE_EXTRA_CA_CERTS="$(pwd)/assets/trust/star_test_example_ca.pem"
IAM_DASHBOARD_BASE_PATH=/dev npx playwright test [--ui]
```

#### Run tests inside Dev Container

To run tests inside the devcontainer, first install Playwright browsers:

```bash
npx playwright install --with-deps
```

The configure the `.env` file with the following variables:

```bash
IAM_API_URL=https://iam.test.example
IAM_DASHBOARD_BASE_URL=https://iam.test.example
IAM_DASHBOARD_BASE_PATH=/devcontainer
```

In one shell, run:

```bash
npm run dev
```

while in other shell run the tests with:

```bash
npx playwright test
```

To use the Playwright's UI from a Dev Container, execute:

```bash
npx playwright test --ui-host 0.0.0.0 --ui-port 8900
```

and go to http://localhost:8900 on your browsers. To open the HTML report
instead, go to http://localhost:8901.

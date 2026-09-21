# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@twirelab/nestjs-auth0` is a small NestJS library that wraps the `auth0` v5 SDK: it exposes `AuthenticationClient` and `ManagementClient` as injectable providers. It is published to npm from the compiled `lib/` directory (gitignored). Requires Node >=20.19 (declared in `engines`; the repo's `.npmrc` sets `engine-strict=true`. Do not add a `preinstall`/`install` script: it would run on consumers' installs, and only `lib/` is published) and NestJS 11 (peer dependency; `@nestjs/*` are devDependencies only).

## Commands

```bash
npm run build                    # tsc -p . → lib/
npm run clean                    # rimraf lib (note: rimraf is not a listed dependency)
npm test                         # jest --verbose (ts-jest, node env)
npx jest test/modules/management.module.test.ts   # single test file
npx jest -t "forRootAsync"       # tests by name
```

There is no linter or formatter configured. CI (`.github/workflows/tests.yml`) runs `npm ci && npm test` on PRs to `master` and `1.x`; publishing (`publish.yml`) builds and runs `npm publish` on a GitHub release.

## Architecture

Two parallel, near-identical feature stacks — **Authentication** and **Management** — each following the same layering (`src/`):

- `modules/<x>.module.ts` — public `@Global()` dynamic module with `forRoot(options)` / `forRootAsync(asyncOptions)`; just delegates to the core module.
- `modules/<x>-core.module.ts` — does the real work. `forRoot` builds a provider with `useValue`. `forRootAsync` registers an intermediate *options* provider under the `AUTH_MODULE` / `MANG_MODULE` token (from `useFactory`, `useClass`, or `useExisting` → `createAuth0Options()`), then a client provider under `AUTH_CLIENT` / `MANG_CLIENT` that injects those options.
- `providers/<x>.provider.ts` — wraps the client in a Nest `Provider` keyed by the client token (sync path only).
- `clients/<x>.client.ts` — trivial factories that call `new AuthenticationClient(...)` / `new ManagementClient(...)`.
- `inject/<x>.inject.ts` — `@InjectAuthentication()` / `@InjectManagement()` decorators, which are just `Inject(AUTH_CLIENT | MANG_CLIENT)`.
- `auth0.options.ts` — option-factory interfaces (`createAuth0Options()`) and `*AsyncOptions` types; also re-exports `ManagementClient` / `AuthenticationClient`.
- `constants.ts` — the injection tokens.

`src/index.ts` is the public surface (options, inject decorators, modules). Providers, clients, core modules, and constants are intentionally **not** exported; tests import constants directly from `src/constants`.

When changing behavior in one stack, check whether the other needs the same change — they are kept in sync by hand, though formatting differs (Authentication files use 4-space indent, Management files use 2-space/Prettier-style).

The Management options type is `ManagementClient.ManagementClientOptionsWithClientCredentials` (client id + secret/assertion key), so the README's static `token` example does not match the current types.

## Tests

`test/` mirrors `src/`. Module tests build a Nest `Test.createTestingModule`, fetch the client by token (`AUTH_CLIENT` / `MANG_CLIENT`), and assert it is an instance of the Auth0 class; async variants cover `useFactory`, `useClass`, and `useExisting`. No network calls are made.

## Versioning

Long-lived branch `1.x` targets the Auth0 v5 / NestJS 11 line (see `MIGRATION_PLAN.md`, written in Polish, and the README migration section); `master` is the default PR base.

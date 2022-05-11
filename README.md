# NestJS Auth0

[![Test package](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml/badge.svg)](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml)

NodeJS Auth0 wrapper for Nestjs

## Install
```bash
npm install @twirelab/nestjs-auth0
```

or

```bash
yarn install @twirelab/nestjs-auth0
```

## Usage

### Authentication Client

Add below code into app.module.js file.

```typescript
import { AuthenticationModule } from "@twirelab/nestjs-auth0";

@Module({
  imports: [
    AuthenticationModule.forRoot({
      domain: '{YOUR_ACCOUNT}.auth0.com',
      clientId: '{CLIENT_ID}',
      clientSecret: '{CLIENT_SECRET}',
    }),
  ],
})
export class AppModule {}
```

### Management Client

Add below code into app.module.js file.

```typescript
import { ManagementModule } from "@twirelab/nestjs-auth0";

@Module({
  imports: [
    ManagementModule.forRoot({
      token: '{YOUR_API_V2_TOKEN}',
      domain: '{YOUR_ACCOUNT}.auth0.com',
    }),
  ],
})
export class AppModule {}
```

To obtain **automatically** a Management API token via the ManagementClient, you can specify the parameters `clientId`, `clientSecret` (use a Non Interactive Client) and optionally `scope`. Behind the scenes the Client Credentials Grant is used to obtain the `access_token` and is by default cached for the duration of the returned `expires_in` value.

```typescript
import { ManagementModule } from "@twirelab/nestjs-auth0";

@Module({
  imports: [
    ManagementModule.forRoot({
      domain: '{YOUR_ACCOUNT}.auth0.com',
      clientId: '{YOUR_NON_INTERACTIVE_CLIENT_ID}',
      clientSecret: '{YOUR_NON_INTERACTIVE_CLIENT_SECRET}',
      scope: 'read:users update:users',
    }),
  ],
})
export class AppModule {}
```

More details you can find here: [auth0/node-auth0](https://github.com/auth0/node-auth0/blob/master/README.md)
# NestJS Auth0

[![Test package](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml/badge.svg)](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml)

NodeJS Auth0 wrapper for Nestjs

## Install
```bash
npm i @twirelab/nestjs-auth0 auth0
npm i -D @types/auth0
```

or

```bash
yarn add @twirelab/nestjs-auth0 auth0
yarn add -D @types/auth0
```

## Authentication Client

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

Now you can inject authentication client into your services, for example:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectAuthentication } from "@twirelab/nestjs-auth0";
import { AuthenticationClient, TokenResponse } from "auth0";

@Injectable()
export class AppService {
  constructor(@InjectAuthentication() private readonly authentication: AuthenticationClient) { }

  async getCredentialsGrant(): Promise<TokenResponse> {
    return await this.authentication.clientCredentialsGrant({ audience: "..." });
  }
}
```

## Management Client

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

Now you can inject management client into your services, for example:
```typescript
import { Injectable } from "@nestjs/common";
import { InjectManagement } from "@twirelab/nestjs-auth0";
import { ManagementClient, User } from "auth0";

@Injectable()
export class AppService {
  constructor(@InjectManagement() private readonly management: ManagementClient) { }

  async getUsers(): Promise<User[]> {
    return await this.management.getUsers();
  }
}
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
# NestJS Auth0

[![Test package](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml/badge.svg)](https://github.com/Twirelab/nestjs-auth0/actions/workflows/tests.yml)

NodeJS Auth0 wrapper for Nestjs

## Install

```bash
npm i @twirelab/nestjs-auth0 auth0
```

or

```bash
yarn add @twirelab/nestjs-auth0 auth0
```

> **Note:** Starting from version 1.0.0, Auth0 v5 includes built-in TypeScript types, so you no longer need to install `@types/auth0` separately.

## Authentication Client

Add below code into app.module.js file.

```typescript
import { AuthenticationModule } from "@twirelab/nestjs-auth0";

@Module({
  imports: [
    AuthenticationModule.forRoot({
      domain: "{YOUR_ACCOUNT}.auth0.com",
      clientId: "{CLIENT_ID}",
      clientSecret: "{CLIENT_SECRET}",
    }),
  ],
})
export class AppModule {}
```

Now you can inject authentication client into your services, for example:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectAuthentication } from "@twirelab/nestjs-auth0";
import { AuthenticationClient } from "auth0";

@Injectable()
export class AppService {
  constructor(
    @InjectAuthentication()
    private readonly authentication: AuthenticationClient
  ) {}

  async signUp(email: string, password: string) {
    return await this.authentication.database.signUp({
      connection: "Username-Password-Authentication",
      username: email,
      password: password,
    });
  }

  async login(email: string, password: string) {
    return await this.authentication.database.signIn({
      connection: "Username-Password-Authentication",
      username: email,
      password: password,
    });
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
      token: "{YOUR_API_V2_TOKEN}",
      domain: "{YOUR_ACCOUNT}.auth0.com",
    }),
  ],
})
export class AppModule {}
```

Now you can inject management client into your services, for example:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectManagement } from "@twirelab/nestjs-auth0";
import { ManagementClient } from "auth0";

@Injectable()
export class AppService {
  constructor(
    @InjectManagement() private readonly management: ManagementClient
  ) {}

  async getUsers() {
    return await this.management.users.list();
  }

  async createUser(userData: any) {
    return await this.management.users.create(userData);
  }

  async getClients() {
    return await this.management.clients.list();
  }
}
```

To obtain **automatically** a Management API token via the ManagementClient, you can specify the parameters `clientId`, `clientSecret` (use a Non Interactive Client) and optionally `scope`. Behind the scenes the Client Credentials Grant is used to obtain the `access_token` and is by default cached for the duration of the returned `expires_in` value.

```typescript
import { ManagementModule } from "@twirelab/nestjs-auth0";

@Module({
  imports: [
    ManagementModule.forRoot({
      domain: "{YOUR_ACCOUNT}.auth0.com",
      clientId: "{YOUR_NON_INTERACTIVE_CLIENT_ID}",
      clientSecret: "{YOUR_NON_INTERACTIVE_CLIENT_SECRET}",
      scope: "read:users update:users",
    }),
  ],
})
export class AppModule {}
```

More details you can find here: [auth0/node-auth0](https://github.com/auth0/node-auth0/blob/master/README.md)

## Migration from 0.x to 1.0

This is a **breaking change** release that migrates from Auth0 v4 to v5. Here are the key changes:

### Breaking Changes

1. **Auth0 v5 Migration**: Updated from Auth0 v4 to v5
2. **TypeScript Types**: Auth0 v5 includes built-in TypeScript types - you no longer need `@types/auth0`
3. **API Changes**: Some method names and signatures have changed in Auth0 v5

### Migration Steps

1. **Update dependencies**:

   ```bash
   npm uninstall @types/auth0
   npm install @twirelab/nestjs-auth0@^1.0.0 auth0@^5.0.0
   ```

2. **Update your code**:

   - Remove any imports of `@types/auth0`
   - Update method calls to match Auth0 v5 API (see [Auth0 v5 Migration Guide](https://github.com/auth0/node-auth0/blob/master/v5_MIGRATION_GUIDE.md))
   - The client injection and module configuration remain the same

3. **Test thoroughly**: Ensure all Auth0 API calls work with the new v5 client

### What's New in v1.0

- ✅ Full Auth0 v5 support
- ✅ Built-in TypeScript types (no more `@types/auth0`)
- ✅ Improved error handling
- ✅ Better performance
- ✅ Enhanced security features
- ✅ Comprehensive test coverage

import { Global, Module, DynamicModule, Provider } from "@nestjs/common";
import { AuthenticationClientOptions } from "auth0";
import { getAuthenticationClient } from "../clients/authentication.client";
import { AUTH_CLIENT, AUTH_MODULE } from "../constants";
import { AuthenticationAsyncOptions, AuthenticationOptionsFactory } from "../auth0.options";
import { createAuthenticationProvider } from "../providers/authentication.provider";

@Global()
@Module({})
export class AuthenticationCoreModule {
    public static forRoot(options: AuthenticationClientOptions): DynamicModule {
        const provider = createAuthenticationProvider(options);

        return {
            exports: [provider],
            module: AuthenticationCoreModule,
            providers: [provider],
        };
    }

    static forRootAsync(options: AuthenticationAsyncOptions): DynamicModule {
        const provider: Provider = {
            inject: [AUTH_MODULE],
            provide: AUTH_CLIENT,
            useFactory: (authOptions: AuthenticationClientOptions) => getAuthenticationClient(authOptions),
        };

        return {
            exports: [provider],
            imports: options.imports,
            module: AuthenticationCoreModule,
            providers: [...this.createAsyncProviders(options), provider],
        };
    }

    private static createAsyncOptionsProvider(options: AuthenticationAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject ?? [],
                provide: AUTH_MODULE,
                useFactory: options.useFactory,
            };
        } else if (options.useExisting || options.useClass) {
            const injectToken = options.useExisting ?? options.useClass;
            if (!injectToken) {
                throw new Error('A valid injection token is required for useExisting or useClass');
            }
            return {
                inject: [injectToken],
                provide: AUTH_MODULE,
                useFactory: (optionsFactory: AuthenticationOptionsFactory) => optionsFactory.createAuth0Options(),
            };
        } else {
            throw new Error('Invalid configuration for the authentication module');
        }
    }

    private static createAsyncProviders(options: AuthenticationAsyncOptions): Provider[] {
        const providers: Provider[] = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass
            });
        }
        return providers;
    }
}

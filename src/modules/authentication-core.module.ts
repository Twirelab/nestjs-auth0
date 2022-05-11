import { Global, Module, DynamicModule, Provider, ClassProvider } from "@nestjs/common";
import { AuthenticationClientOptions } from "auth0";
import { getAuthenticationClient } from "../clients/authentication.client";
import { AUTH_CLIENT, AUTH_TOKEN } from "../constants";
import { AuthenticationAsyncOptions, AuthenticationOptionsFactory } from "../auth0.options";
import { createAuthenticationProvider } from "../providers/authentication.provider";

@Global()
@Module({})
export class AuthenticationCoreModule {
    /**
     * For root.
     * 
     * @param {AuthenticationClientOptions} options 
     * 
     * @return {DynamicModule}
     */
    public static forRoot(options: AuthenticationClientOptions): DynamicModule {
        const provider = createAuthenticationProvider(options);

        return {
            exports: [provider],
            module: AuthenticationCoreModule,
            providers: [provider],
        }
    }

    /**
     * For root async.
     * 
     * @param {AuthenticationAsyncOptions} options 
     * 
     * @return {DynamicModule} 
     */
    static forRootAsync(options: AuthenticationAsyncOptions): DynamicModule {
        const provider: Provider<any> = {
            inject: [AUTH_CLIENT],
            provide: AUTH_TOKEN,
            useFactory: (authOptions: AuthenticationClientOptions) => getAuthenticationClient(authOptions),
        }

        return {
            exports: [provider],
            imports: options.imports,
            module: AuthenticationCoreModule,
            providers: [...this.createAsyncProviders(options), provider],
        }
    }

    /**
     * Create async options provider.
     * 
     * @param {AuthenticationAsyncOptions} options 
     * 
     * @return {Provider}
     */
    private static createAsyncOptionsProvider(options: AuthenticationAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject ?? [],
                provide: AUTH_CLIENT,
                useFactory: options.useFactory,
            };
        }

        return {
            inject: options.useExisting
                ? [options.useExisting]
                : options.useClass
                    ? [options.useClass]
                    : [],
            provide: AUTH_CLIENT,
            useFactory: (optionsFactory: AuthenticationOptionsFactory) => optionsFactory.createAuth0Options(),
        }
    }

    /**
     * Create async provider.
     * 
     * @param {AuthenticationAsyncOptions} options 
     * 
     * @return {Provider[]}
     */
    private static createAsyncProviders(options: AuthenticationAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
                inject: [options.inject ?? []],
            } as ClassProvider,
        ];
    }
}
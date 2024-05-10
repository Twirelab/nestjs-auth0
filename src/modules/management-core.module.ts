import { Global, Module, DynamicModule, Provider, ClassProvider } from "@nestjs/common";
import { ManagementClientOptions } from "auth0/dist/cjs/management/management-client-options";
import { getManagementClient } from "../clients/management.client";
import { ManagementAsyncOptions, ManagementOptionsFactory } from "../auth0.options";
import { createManagementProvider } from "../providers/management.provider";
import { MANG_CLIENT, MANG_MODULE } from "../constants";
import { ManagementClientOptionsWithClientCredentials } from "auth0";

@Global()
@Module({})
export class ManagementCoreModule {
    public static forRoot(options: ManagementClientOptions & { clientId: string; clientAssertionSigningKey: string; }): DynamicModule {
        const provider = createManagementProvider(options);

        return {
            exports: [provider],
            module: ManagementCoreModule,
            providers: [provider],
        };
    }

    static forRootAsync(options: ManagementAsyncOptions): DynamicModule {
        const provider: Provider = {
            inject: [MANG_MODULE],
            provide: MANG_CLIENT,
            useFactory: (authOptions: ManagementClientOptionsWithClientCredentials) => getManagementClient(authOptions),
        };

        return {
            exports: [provider],
            imports: options.imports,
            module: ManagementCoreModule,
            providers: [...this.createAsyncProviders(options), provider],
        };
    }

    private static createAsyncOptionsProvider(options: ManagementAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                inject: options.inject ?? [],
                provide: MANG_MODULE,
                useFactory: options.useFactory,
            };
        }

        const inject = options.useExisting ? [options.useExisting] : (options.useClass ? [options.useClass] : []);
        if (inject.length === 0) {
            throw new Error('Invalid configuration for the management module: A valid injection token is required');
        }
        return {
            inject,
            provide: MANG_MODULE,
            useFactory: (optionsFactory: ManagementOptionsFactory) => optionsFactory.createAuth0Options(),
        };
    }

    private static createAsyncProviders(options: ManagementAsyncOptions): Provider[] {
        const providers: Provider[] = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
                ...(options.inject ? { inject: options.inject } : {}),
            } as ClassProvider);
        }
        return providers;
    }
}

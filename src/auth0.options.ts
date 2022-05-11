import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { ManagementClientOptions, AuthenticationClientOptions } from "auth0";
import type { ManagementClient, AuthenticationClient } from "auth0";

export interface ManagementOptionsFactory {
    createAuth0Options(): Promise<ManagementClientOptions> | ManagementClientOptions;
}

export interface AuthenticationOptionsFactory {
    createAuth0Options(): Promise<AuthenticationClientOptions> | AuthenticationClientOptions;
}

export interface ManagementAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[];
    useClass?: Type<ManagementOptionsFactory>;
    useExisting?: Type<ManagementOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<ManagementClientOptions> | ManagementClientOptions;
}

export interface AuthenticationAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    inject?: any[];
    useClass?: Type<AuthenticationOptionsFactory>;
    useExisting?: Type<AuthenticationOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<AuthenticationClientOptions> | AuthenticationClientOptions;
}

export { ManagementClient, AuthenticationClient };
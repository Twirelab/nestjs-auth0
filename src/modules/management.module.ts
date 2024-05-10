import { DynamicModule, Global, Module } from "@nestjs/common";
import { ManagementAsyncOptions } from "../auth0.options";
import { ManagementCoreModule } from "./management-core.module";
import {ManagementClientOptions} from "auth0";

@Global()
@Module({})
export class ManagementModule {
    /**
     * For root.
     * 
     * @param {ManagementClientOptions} options 
     * 
     * @return {DynamicModule}
     */
    public static forRoot(options: ManagementClientOptions & { clientId: string; clientAssertionSigningKey: string; }): DynamicModule {
        return {
            module: ManagementModule,
            imports: [ManagementCoreModule.forRoot(options)],
        };
    }

    /**
     * For root async.
     * 
     * @param {Auth0AsyncOptions} options 
     * 
     * @return {DynamicModule}
     */
    public static forRootAsync(options: ManagementAsyncOptions): DynamicModule {
        return {
            module: ManagementModule,
            imports: [ManagementCoreModule.forRootAsync(options)],
        }
    }
}
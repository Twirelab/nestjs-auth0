import { DynamicModule, Global, Module } from "@nestjs/common";
import { AuthenticationClientOptions } from "auth0";
import { AuthenticationAsyncOptions } from "../auth0.options";
import { AuthenticationCoreModule } from "./authentication-core.module";

@Global()
@Module({})
export class AuthenticationModule {
    /**
     * For root.
     * 
     * @param {AuthenticationClientOptions} options 
     * 
     * @return {DynamicModule}
     */
    public static forRoot(options: AuthenticationClientOptions): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [AuthenticationCoreModule.forRoot(options)],
        };
    }

    /**
     * For root async.
     * 
     * @param {Auth0AsyncOptions} options 
     * 
     * @return {DynamicModule}
     */
    public static forRootAsync(options: AuthenticationAsyncOptions): DynamicModule {
        return {
            module: AuthenticationModule,
            imports: [AuthenticationCoreModule.forRootAsync(options)],
        }
    }
}
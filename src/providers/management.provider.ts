import { Provider } from "@nestjs/common";
import { ManagementClient, ManagementClientOptions } from "auth0";
import { getManagementClient } from "../clients/management.client";
import { MANG_CLIENT } from "../constants";

/**
 * Create Auth0 Management provider.
 * 
 * @param {ManagementClientOptions} options
 * 
 * @return
 */
export function createManagementProvider(options: ManagementClientOptions): Provider<ManagementClient> {
    return {
        provide: MANG_CLIENT,
        useValue: getManagementClient(options),
    }
}
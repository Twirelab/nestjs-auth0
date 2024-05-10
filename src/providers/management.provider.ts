import { Provider } from "@nestjs/common";
import { ManagementClientOptions } from "auth0";
import { ManagementClientBase as ManagementClient } from "auth0/dist/cjs/management/__generated/index";
import { getManagementClient } from "../clients/management.client";
import { MANG_CLIENT } from "../constants";

/**
 * Create Auth0 Management provider.
 *
 * @param {ManagementClientOptions & { clientId: string, clientAssertionSigningKey: string }} options
 *
 * @return
 */
export function createManagementProvider(options: ManagementClientOptions & { clientId: string, clientAssertionSigningKey: string }): Provider<ManagementClient> {
    return {
        provide: MANG_CLIENT,
        useValue: getManagementClient(options),
    }
}
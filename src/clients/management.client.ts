import { ManagementClient, ManagementClientOptions } from "auth0";

/**
 * Get Auth0 Authentication client.
 * 
 * @param {ManagementClientOptions} options 
 * 
 * @return {mana}
 */
export function getManagementClient(options: ManagementClientOptions): ManagementClient {
    return new ManagementClient(options);
}
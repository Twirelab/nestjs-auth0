import { ManagementClient, ManagementClientOptionsWithClientCredentials } from "auth0";
// import type { ManagementClientBase } from "auth0";

/**
 * Get Auth0 Authentication client.
 * 
 * @param {ManagementClientOptions} options 
 * 
 * @return {mana}
 */
export function getManagementClient(options: ManagementClientOptionsWithClientCredentials): ManagementClient {
    return new ManagementClient(options);
}
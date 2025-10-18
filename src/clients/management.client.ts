import { ManagementClient } from "auth0";

/**
 * Get Auth0 Management client.
 *
 * @param {ManagementClient.ManagementClientOptionsWithClientCredentials} options
 *
 * @return {ManagementClient}
 */
export function getManagementClient(
  options: ManagementClient.ManagementClientOptionsWithClientCredentials
): ManagementClient {
  return new ManagementClient(options);
}

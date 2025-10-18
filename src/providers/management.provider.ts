import { Provider } from "@nestjs/common";
import { ManagementClient } from "auth0";
import { getManagementClient } from "../clients/management.client";
import { MANG_CLIENT } from "../constants";

/**
 * Create Auth0 Management provider.
 *
 * @param {ManagementClient.ManagementClientOptionsWithClientCredentials} options
 *
 * @return
 */
export function createManagementProvider(
  options: ManagementClient.ManagementClientOptionsWithClientCredentials
): Provider<ManagementClient> {
  return {
    provide: MANG_CLIENT,
    useValue: getManagementClient(options),
  };
}

import { AuthenticationClient, AuthenticationClientOptions } from "auth0";

/**
 * Get Auth0 Authentication client.
 *
 * @param {AuthenticationClientOptions} options
 *
 * @return {AuthenticationClient}
 */
export function getAuthenticationClient(
  options: AuthenticationClientOptions
): AuthenticationClient {
  return new AuthenticationClient(options);
}

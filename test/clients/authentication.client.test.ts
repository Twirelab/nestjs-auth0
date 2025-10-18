import { getAuthenticationClient } from "../../src/clients/authentication.client";
import { AuthenticationClient } from "auth0";

describe("Get Authentication Client", () => {
  it("Returns authentication client", () => {
    const client = getAuthenticationClient({
      clientId: "test",
      clientSecret: "test",
      domain: "test.com",
    });

    expect(client).toBeInstanceOf(AuthenticationClient);
  });

  it("Returns authentication client with minimal options", () => {
    const client = getAuthenticationClient({
      clientId: "test",
      domain: "test.com",
    });

    expect(client).toBeInstanceOf(AuthenticationClient);
  });

  it("Returns authentication client with client assertion", () => {
    const client = getAuthenticationClient({
      clientId: "test",
      domain: "test.com",
      clientAssertionSigningKey: "test-key",
    });

    expect(client).toBeInstanceOf(AuthenticationClient);
  });
});

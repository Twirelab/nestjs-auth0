import { getManagementClient } from "../../src/clients/management.client";
import { ManagementClient } from "auth0";

describe("Get ManagementClient Client", () => {
  it("Returns managementClient client with client assertion", () => {
    const client = getManagementClient({
      domain: "test.com",
      clientId: "yourClientId",
      clientAssertionSigningKey: "yourClientAssertionSigningKey",
    });

    expect(client).toBeInstanceOf(ManagementClient);
  });

  it("Returns managementClient client with client secret", () => {
    const client = getManagementClient({
      domain: "test.com",
      clientId: "yourClientId",
      clientSecret: "yourClientSecret",
    });

    expect(client).toBeInstanceOf(ManagementClient);
  });

  it("Returns managementClient client with custom audience", () => {
    const client = getManagementClient({
      domain: "test.com",
      clientId: "yourClientId",
      clientAssertionSigningKey: "yourClientAssertionSigningKey",
      audience: "https://api.example.com",
    });

    expect(client).toBeInstanceOf(ManagementClient);
  });
});

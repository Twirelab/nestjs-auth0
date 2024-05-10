import { getManagementClient } from "../../src/clients/management.client";
import { ManagementClient } from "auth0";

describe("Get ManagementClient Client", () => {
    it("Returns managementClient client", () => {
        const client = getManagementClient({
            domain: "test.com",
            clientId: "yourClientId",
            clientAssertionSigningKey: "yourClientAssertionSigningKey"
        });

        expect(client).toBeInstanceOf(ManagementClient);
    })
});
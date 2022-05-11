import { getManagementClient } from "../../src/clients/management.client";
import { ManagementClient } from "auth0";

describe("Get ManagementClient Client", () => {
    it("Returns managementClient client", () => {
        const client = getManagementClient({
            token: "test",
            domain: "test.com",
        });

        expect(client).toBeInstanceOf(ManagementClient);
    })
});
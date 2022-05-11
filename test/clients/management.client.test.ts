import { getAuthenticationClient } from "../../src/clients/authentication.client";
import { AuthenticationClient } from "auth0";

describe("Get Authentication Client", () => {
    it("Returns authentication client", () => {
        const client = getAuthenticationClient({
            clientId: "test",
            clientSecret: "test",
            domain: "test.com"
        });

        expect(client).toBeInstanceOf(AuthenticationClient);
    })
});
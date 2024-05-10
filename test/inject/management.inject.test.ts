import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ManagementClient } from "auth0";
import { InjectManagement } from "../../src"
import { ManagementModule } from "../../src";

describe("Inject Management", () => {
    let module: TestingModule;

    @Injectable()
    class TestService {
        public constructor(@InjectManagement() public readonly client: ManagementClient) { }
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [ManagementModule.forRoot({
                domain: 'test.com',
                audience: 'test',
                clientId: 'yourClientId',
                clientAssertionSigningKey: 'yourClientAssertionSigningKey'
            })],
            providers: [TestService],
        }).compile();
    });

    describe("when decorating a class constructor parameter", () => {
        it("should inject the management client", () => {
            const testService = module.get(TestService);

            expect(testService.client).toBeInstanceOf(ManagementClient);
        })
    })
})
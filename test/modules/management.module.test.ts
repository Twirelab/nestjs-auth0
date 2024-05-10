import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ManagementClient, ManagementClientOptions } from "auth0";
import { ManagementOptionsFactory } from "../../src";
import { MANG_CLIENT } from "../../src/constants";
import { ManagementModule } from "../../src";

const testServiceOptions: ManagementClientOptions & { clientId: string; clientAssertionSigningKey: string; } = {
    domain: "test.com",
    audience: "test",
    clientId: "yourClientId",
    clientAssertionSigningKey: "yourClientAssertionSigningKey",
}

describe("Authentication Module", () => {
    class TestService implements ManagementOptionsFactory {
        createAuth0Options(): ManagementClientOptions {
            return testServiceOptions
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule { }

    describe("forRoot", () => {
        it("provide management client", async () => {
            const module = await Test.createTestingModule({
                imports: [ManagementModule.forRoot(testServiceOptions)],
            }).compile();

            const managementClient = module.get<ManagementClient>(MANG_CLIENT);

            expect(managementClient).toBeDefined();
            expect(managementClient).toBeInstanceOf(ManagementClient);
        })
    });

    describe("forRootAsync", () => {
        it("provide management client with `useFactory`", async () => {
            const module = await Test.createTestingModule({
                imports: [ManagementModule.forRootAsync({
                    useFactory: () => (testServiceOptions),
                })],
            }).compile();

            const managementClient = module.get<ManagementClient>(MANG_CLIENT);

            expect(managementClient).toBeDefined();
            expect(managementClient).toBeInstanceOf(ManagementClient);
        });

        it("provide management client with `useExisitng`", async () => {
            const module = await Test.createTestingModule({
                imports: [ManagementModule.forRootAsync({
                    imports: [TestModule],
                    useExisting: TestService
                })],
            }).compile();

            const managementClient = module.get<ManagementClient>(MANG_CLIENT);

            expect(managementClient).toBeDefined();
            expect(managementClient).toBeInstanceOf(ManagementClient);
        });

        it("provide management client with `useClass`", async () => {
            const module = await Test.createTestingModule({
                imports: [ManagementModule.forRootAsync({
                    useClass: TestService
                })],
            }).compile();

            const managementClient = module.get<ManagementClient>(MANG_CLIENT);

            expect(managementClient).toBeDefined();
            expect(managementClient).toBeInstanceOf(ManagementClient);
        });
    });
})
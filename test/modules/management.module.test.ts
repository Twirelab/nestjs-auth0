import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ManagementClient, ManagementClientOptions } from "auth0";
import { ManagementOptionsFactory } from "../../src/auth0.options";
import { MANG_CLIENT } from "../../src/constants";
import { ManagementModule } from "../../src/modules/management.module";

const testServiceOptions: ManagementClientOptions = {
    domain: "test.com",
    clientId: "testId",
    clientSecret: "testSecret",
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
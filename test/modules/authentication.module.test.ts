import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthenticationClient, AuthenticationClientOptions } from "auth0";
import { AuthenticationOptionsFactory } from "../../src";
import { AUTH_CLIENT } from "../../src/constants";
import { AuthenticationModule } from "../../src";

const testServiceOptions: AuthenticationClientOptions = {
    domain: "test.com",
    clientId: "testId",
    clientSecret: "testSecret",
}

describe("Authentication Module", () => {
    class TestService implements AuthenticationOptionsFactory {
        createAuth0Options(): AuthenticationClientOptions {
            return testServiceOptions
        }
    }

    @Module({
        exports: [TestService],
        providers: [TestService],
    })
    class TestModule { }

    describe("forRoot", () => {
        it("provide authentication client", async () => {
            const module = await Test.createTestingModule({
                imports: [AuthenticationModule.forRoot(testServiceOptions)],
            }).compile();

            const authenticationClient = module.get<AuthenticationClient>(AUTH_CLIENT);

            expect(authenticationClient).toBeDefined();
            expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
        })
    });

    describe("forRootAsync", () => {
        it("provide authentication client with `useFactory`", async () => {
            const module = await Test.createTestingModule({
                imports: [AuthenticationModule.forRootAsync({
                    useFactory: () => (testServiceOptions),
                })],
            }).compile();

            const authenticationClient = module.get<AuthenticationClient>(AUTH_CLIENT);

            expect(authenticationClient).toBeDefined();
            expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
        });

        it("provide authentication client with `useExisitng`", async () => {
            const module = await Test.createTestingModule({
                imports: [AuthenticationModule.forRootAsync({
                    imports: [TestModule],
                    useExisting: TestService
                })],
            }).compile();

            const authenticationClient = module.get<AuthenticationClient>(AUTH_CLIENT);

            expect(authenticationClient).toBeDefined();
            expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
        });

        it("provide authentication client with `useClass`", async () => {
            const module = await Test.createTestingModule({
                imports: [AuthenticationModule.forRootAsync({
                    useClass: TestService
                })],
            }).compile();

            const authenticationClient = module.get<AuthenticationClient>(AUTH_CLIENT);

            expect(authenticationClient).toBeDefined();
            expect(authenticationClient).toBeInstanceOf(AuthenticationClient);
        });
    });
})
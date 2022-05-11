import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationClient } from "auth0";
import { InjectAuthentication } from "../../src/inject/authentication.inject"
import { AuthenticationModule } from "../../src/modules/authentication.module";

describe("Inject Authentication", () => {
    let module: TestingModule;

    @Injectable()
    class TestService {
        public constructor(@InjectAuthentication() public readonly client: AuthenticationClient) { }
    }

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AuthenticationModule.forRoot({ domain: "test.com" })],
            providers: [TestService],
        }).compile();
    });

    describe("when decorating a class constructor parameter", () => {
        it("should inject the authentication client", () => {
            const testService = module.get(TestService);

            expect(testService.client).toBeInstanceOf(AuthenticationClient);
        })
    })
})
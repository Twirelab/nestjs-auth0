import { Inject } from "@nestjs/common";
import { AUTH_CLIENT } from "../constants";

/**
 * Inject authentication client.
 * 
 * @returns 
 */
export function InjectAuthentication() {
    return Inject(AUTH_CLIENT);
}
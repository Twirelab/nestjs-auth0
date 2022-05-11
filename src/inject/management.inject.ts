import { Inject } from "@nestjs/common";
import { MANG_CLIENT } from "../constants";

/**
 * Inject management client.
 * 
 * @returns 
 */
export function InjectManagement() {
    return Inject(MANG_CLIENT);
}
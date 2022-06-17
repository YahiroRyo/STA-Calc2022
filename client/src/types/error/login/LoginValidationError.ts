import { ValidationError } from "../ValidationError";

export type LoginValidationError = ValidationError & {
    errors: {
        password: string[],
        user_name: string[]
    }
};
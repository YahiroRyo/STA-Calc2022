import { ValidationError } from "../ValidationError";

export type UserCreateValidationError = ValidationError & {
    errors: {
        password: string[],
        user_name: string[]
    }
};
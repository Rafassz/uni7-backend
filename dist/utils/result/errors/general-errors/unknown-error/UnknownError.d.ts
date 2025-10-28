import { IResultError } from "../../result-error";
import { IUnknownError } from "./IUnknownError";
export declare const UnknownError: (data?: {
    error?: any;
    extraInfo?: any;
}) => IResultError<IUnknownError>;

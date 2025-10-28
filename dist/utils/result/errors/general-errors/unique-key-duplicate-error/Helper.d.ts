import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";
export declare const Helper: (data: {
    key: string;
    value: string;
    extraInfo?: string;
}) => IResultError<IErrorType>;

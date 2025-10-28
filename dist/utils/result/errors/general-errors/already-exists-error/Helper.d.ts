import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";
export declare const Helper: (data: {
    key: string;
    customMessage?: string;
    extraInfo?: any;
}) => IResultError<IErrorType>;

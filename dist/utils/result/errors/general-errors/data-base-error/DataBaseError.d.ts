import { IResultError } from "../../result-error";
import { IDataBaseError } from "./IDataBaseError";
export declare const DataBaseError: (data?: {
    error?: any;
}) => IResultError<IDataBaseError>;

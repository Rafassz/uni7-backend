import { IResultError } from "../../result-error";
import { IUnknownError } from "./IUnknownError";

export const UnknownError = (data?: {
  error?: any,
  extraInfo?: any
}): IResultError<IUnknownError> => {
    return {
        type: 'UnknownError',
        message: 'Ocorreu um erro desconhecido',
        error: data?.error,
        extraInfo: data?.extraInfo
    }
}
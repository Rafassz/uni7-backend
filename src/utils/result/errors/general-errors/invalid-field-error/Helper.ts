import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  key?: string,
  value?: string,
  customMessage?: string,
  extraInfo?: any
}): IResultError<IErrorType> => {
  return {
    type: 'InvalidFieldError',
    message: data.customMessage ? data.customMessage : `O campo ${data.key} com valor ${data.value} é inválido.`,
    error: `O campo ${data.key} com valor ${data.value} é inválido.`,
    extraInfo: data.extraInfo
  }
}
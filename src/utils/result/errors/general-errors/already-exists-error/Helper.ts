import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  key: string
  customMessage?: string
  extraInfo?: any
}): IResultError<IErrorType> => {
  return {
    type: 'InvalidActionError',
    message: data.customMessage ? data.customMessage : `${data.key} já existe no banco de dados`,
    error: data.customMessage ? data.customMessage : `Não foi possível realizar a ação: ${data.key}`,

    extraInfo: data.extraInfo
  }
}
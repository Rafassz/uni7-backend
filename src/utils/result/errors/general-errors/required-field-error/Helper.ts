import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  key: string
}): IResultError<IErrorType> => {
  return {
    type: 'RequiredFieldError',
    error: `O campo ${data.key} é obrigatório`,
    message: `O campo ${data.key} é obrigatório`
  }
}
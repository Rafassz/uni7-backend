import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  extraInfo?: string

}): IResultError<IErrorType> => {
  return {
    type: 'WrongCredentials',
    message: 'Credenciais inválidas',
    extraInfo: data.extraInfo
  }
}
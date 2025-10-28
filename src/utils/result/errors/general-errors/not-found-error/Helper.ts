import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  key: string
}): IResultError<IErrorType> => {
  return {
    type: 'NotFoundError',
    message: `O (a) ${data.key} não foi encontrado (a) em nosso banco de dados.`,
    error: `O (a) ${data.key} não foi encontrado (a) em nosso banco de dados.`
  }
}
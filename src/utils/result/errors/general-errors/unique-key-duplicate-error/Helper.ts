import { IResultError } from "../../result-error";
import { IErrorType } from "./IErrorType";

export const Helper = (data: {
  key: string,
  value: string,
  extraInfo?: string

}): IResultError<IErrorType> => {
  return {
    type: 'UniqueKeyDuplicateError',
    message: `O ${data.key.toLocaleLowerCase()} ${data.value} já existe em nosso banco de dados.`,
    error: `O ${data.key.toLocaleLowerCase()} ${data.value} já existe em nosso banco de dados.`,
    extraInfo: data.extraInfo
  }
}
import { IResultError } from "../../result-error";
import { IDataBaseError } from "./IDataBaseError";

export const DataBaseError = (data?: {
  error?: any
}): IResultError<IDataBaseError> => {
  return {
    type: 'DataBaseError',
    message: 'Ocorreu um erro durante a tentativa de se conectar ao banco de dados',
    error: data?.error
  }
}
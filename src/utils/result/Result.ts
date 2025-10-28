export class Result<T, E> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error?: E;
  private _value?: T;

  private constructor(isSuccess: boolean, error?: E, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: Um resultado não pode
      ser de sucesso e conter um erro`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: Um resultado com falha 
      precisa ter uma mensagem de erro`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T | undefined {
    if (this.isFailure) {
      throw new Error(`Não é possível recuperar o valor de um resultado com falha.`)
    }

    return this._value;
  }

  public static ok<U, E>(value?: U): Result<U, E> {
    return new Result<U, E>(true, undefined, value);
  }

  public static fail<U, E>(error: E): Result<U, E> {
    return new Result<U, E>(false, error);
  }

  public static combine(results: Result<any, any>[]): Result<any, any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok<any, any>();
  }
}
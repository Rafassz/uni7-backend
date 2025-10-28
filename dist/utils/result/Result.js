"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(isSuccess, error, value) {
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
    getValue() {
        if (this.isFailure) {
            throw new Error(`Não é possível recuperar o valor de um resultado com falha.`);
        }
        return this._value;
    }
    static ok(value) {
        return new Result(true, undefined, value);
    }
    static fail(error) {
        return new Result(false, error);
    }
    static combine(results) {
        for (let result of results) {
            if (result.isFailure)
                return result;
        }
        return Result.ok();
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map
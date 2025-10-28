export declare class Result<T, E> {
    isSuccess: boolean;
    isFailure: boolean;
    error?: E;
    private _value?;
    private constructor();
    getValue(): T | undefined;
    static ok<U, E>(value?: U): Result<U, E>;
    static fail<U, E>(error: E): Result<U, E>;
    static combine(results: Result<any, any>[]): Result<any, any>;
}

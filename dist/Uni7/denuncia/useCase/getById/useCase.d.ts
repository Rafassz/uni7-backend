import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, Result } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';
type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError;
export interface IGetByIdDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>;
}
export declare class GetByIdDenunciaUseCase implements IGetByIdDenunciaUseCase {
    private readonly _denunciaRepository;
    constructor(props: {
        repository: {
            DenunciaRepository: IDenunciaRepository;
        };
    });
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>;
}
export {};

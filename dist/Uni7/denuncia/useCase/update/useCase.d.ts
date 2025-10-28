import { IDataBaseError, IInvalidFieldError, INotFoundError, IRequiredFieldError, IResultError, IUnknownError, Result } from "../../../../utils/result";
import { IDenunciaRepository } from '../../repository';
import { IRequest, IResponse } from './DTO';
type Errors = IUnknownError | IRequiredFieldError | INotFoundError | IInvalidFieldError | IDataBaseError;
export interface IUpdateDenunciaUseCase {
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>;
}
export declare class UpdateDenunciaUseCase implements IUpdateDenunciaUseCase {
    private readonly _denunciaRepository;
    constructor(props: {
        repository: {
            DenunciaRepository: IDenunciaRepository;
        };
    });
    execute(request: IRequest): Promise<Result<IResponse, IResultError<Errors>>>;
}
export {};

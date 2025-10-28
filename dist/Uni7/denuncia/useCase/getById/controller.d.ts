import { IGetByIdDenunciaUseCase } from "./useCase";
import { Request, Response } from 'express';
export declare class GetByIdDenunciaController {
    private readonly _getByIdDenunciaUseCase;
    constructor(props: {
        useCase: {
            getByIdDenunciaUseCase: IGetByIdDenunciaUseCase;
        };
    });
    handle(request: Request, response: Response): Promise<Response>;
}

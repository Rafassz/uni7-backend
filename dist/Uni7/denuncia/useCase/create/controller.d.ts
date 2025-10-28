import { ICreateDenunciaUseCase } from "./useCase";
import { Request, Response } from 'express';
export declare class CreateDenunciaController {
    private readonly _createDenunciaUseCase;
    constructor(props: {
        useCase: {
            createDenunciaUseCase: ICreateDenunciaUseCase;
        };
    });
    handle(request: Request, response: Response): Promise<Response>;
}

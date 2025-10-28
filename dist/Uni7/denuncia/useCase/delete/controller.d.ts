import { IDeleteDenunciaUseCase } from "./useCase";
import { Request, Response } from 'express';
export declare class DeleteDenunciaController {
    private readonly _deleteDenunciaUseCase;
    constructor(props: {
        useCase: {
            deleteDenunciaUseCase: IDeleteDenunciaUseCase;
        };
    });
    handle(request: Request, response: Response): Promise<Response>;
}

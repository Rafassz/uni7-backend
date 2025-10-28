import { IUpdateDenunciaUseCase } from "./useCase";
import { Request, Response } from 'express';
export declare class UpdateDenunciaController {
    private readonly _updateDenunciaUseCase;
    constructor(props: {
        useCase: {
            updateDenunciaUseCase: IUpdateDenunciaUseCase;
        };
    });
    handle(request: Request, response: Response): Promise<Response>;
}

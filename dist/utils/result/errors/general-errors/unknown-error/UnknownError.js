"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownError = void 0;
const UnknownError = (data) => {
    return {
        type: 'UnknownError',
        message: 'Ocorreu um erro desconhecido',
        error: data?.error,
        extraInfo: data?.extraInfo
    };
};
exports.UnknownError = UnknownError;
//# sourceMappingURL=UnknownError.js.map
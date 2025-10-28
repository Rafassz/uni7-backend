"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
const DataBaseError = (data) => {
    return {
        type: 'DataBaseError',
        message: 'Ocorreu um erro durante a tentativa de se conectar ao banco de dados',
        error: data?.error
    };
};
exports.DataBaseError = DataBaseError;
//# sourceMappingURL=DataBaseError.js.map
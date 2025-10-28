"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'WrongCredentials',
        message: 'Credenciais inválidas',
        extraInfo: data.extraInfo
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
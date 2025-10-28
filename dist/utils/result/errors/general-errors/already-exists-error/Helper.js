"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'InvalidActionError',
        message: data.customMessage ? data.customMessage : `${data.key} já existe no banco de dados`,
        error: data.customMessage ? data.customMessage : `Não foi possível realizar a ação: ${data.key}`,
        extraInfo: data.extraInfo
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
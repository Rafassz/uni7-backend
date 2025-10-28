"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'InvalidFieldError',
        message: data.customMessage ? data.customMessage : `O campo ${data.key} com valor ${data.value} é inválido.`,
        error: `O campo ${data.key} com valor ${data.value} é inválido.`,
        extraInfo: data.extraInfo
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
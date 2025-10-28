"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'RequiredFieldError',
        error: `O campo ${data.key} é obrigatório`,
        message: `O campo ${data.key} é obrigatório`
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
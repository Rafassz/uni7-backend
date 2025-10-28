"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'FailedProcessError',
        message: `O (a) ${data.key} não foi encontrado (a) em nosso banco de dados.`,
        error: `O (a) ${data.key} não foi encontrado (a) em nosso banco de dados.`
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
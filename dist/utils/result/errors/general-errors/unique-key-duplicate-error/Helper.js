"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const Helper = (data) => {
    return {
        type: 'UniqueKeyDuplicateError',
        message: `O ${data.key.toLocaleLowerCase()} ${data.value} já existe em nosso banco de dados.`,
        error: `O ${data.key.toLocaleLowerCase()} ${data.value} já existe em nosso banco de dados.`,
        extraInfo: data.extraInfo
    };
};
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map
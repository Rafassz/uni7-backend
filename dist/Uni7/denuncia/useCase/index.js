"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDeleteDenunciaController = exports.DeleteDenunciaController = exports.DeleteDenunciaUseCase = exports.setupUpdateDenunciaController = exports.UpdateDenunciaController = exports.UpdateDenunciaUseCase = exports.setupGetByIdDenunciaController = exports.GetByIdDenunciaController = exports.GetByIdDenunciaUseCase = exports.setupCreateDenunciaController = exports.CreateDenunciaController = exports.CreateDenunciaUseCase = void 0;
// Create
var useCase_1 = require("./create/useCase");
Object.defineProperty(exports, "CreateDenunciaUseCase", { enumerable: true, get: function () { return useCase_1.CreateDenunciaUseCase; } });
var controller_1 = require("./create/controller");
Object.defineProperty(exports, "CreateDenunciaController", { enumerable: true, get: function () { return controller_1.CreateDenunciaController; } });
var setupController_1 = require("./create/setupController");
Object.defineProperty(exports, "setupCreateDenunciaController", { enumerable: true, get: function () { return setupController_1.setupCreateDenunciaController; } });
// GetById
var useCase_2 = require("./getById/useCase");
Object.defineProperty(exports, "GetByIdDenunciaUseCase", { enumerable: true, get: function () { return useCase_2.GetByIdDenunciaUseCase; } });
var controller_2 = require("./getById/controller");
Object.defineProperty(exports, "GetByIdDenunciaController", { enumerable: true, get: function () { return controller_2.GetByIdDenunciaController; } });
var setupController_2 = require("./getById/setupController");
Object.defineProperty(exports, "setupGetByIdDenunciaController", { enumerable: true, get: function () { return setupController_2.setupGetByIdDenunciaController; } });
// Update
var useCase_3 = require("./update/useCase");
Object.defineProperty(exports, "UpdateDenunciaUseCase", { enumerable: true, get: function () { return useCase_3.UpdateDenunciaUseCase; } });
var controller_3 = require("./update/controller");
Object.defineProperty(exports, "UpdateDenunciaController", { enumerable: true, get: function () { return controller_3.UpdateDenunciaController; } });
var setupController_3 = require("./update/setupController");
Object.defineProperty(exports, "setupUpdateDenunciaController", { enumerable: true, get: function () { return setupController_3.setupUpdateDenunciaController; } });
// Delete
var useCase_4 = require("./delete/useCase");
Object.defineProperty(exports, "DeleteDenunciaUseCase", { enumerable: true, get: function () { return useCase_4.DeleteDenunciaUseCase; } });
var controller_4 = require("./delete/controller");
Object.defineProperty(exports, "DeleteDenunciaController", { enumerable: true, get: function () { return controller_4.DeleteDenunciaController; } });
var setupController_4 = require("./delete/setupController");
Object.defineProperty(exports, "setupDeleteDenunciaController", { enumerable: true, get: function () { return setupController_4.setupDeleteDenunciaController; } });
//# sourceMappingURL=index.js.map
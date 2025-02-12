"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = void 0;
var http_utils_1 = require("../utils/http-utils");
var OperationsService = /** @class */ (function () {
    function OperationsService() {
    }
    OperationsService.getAllOperationsPeriod = function (period) {
        return __awaiter(this, void 0, void 0, function () {
            var returnObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnObject = {
                            error: false,
                            allOperations: null
                        };
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations?period=' + period)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result.error) {
                            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
                            return [2 /*return*/, returnObject];
                        }
                        returnObject.allOperations = result;
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    OperationsService.getAllOperationsInterval = function (period, body) {
        return __awaiter(this, void 0, void 0, function () {
            var returnObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnObject = {
                            error: false,
                            allOperations: null
                        };
                        this.body = body;
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations?period=' + period + '&dateFrom=' + this.body.dateFrom + '&dateTo=' + this.body.dateTo)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
                            return [2 /*return*/, returnObject];
                        }
                        returnObject.allOperations = result;
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    OperationsService.getOperationById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var returnObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnObject = {
                            error: false,
                            operation: null
                        };
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations/' + id)];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result) {
                            returnObject.error = 'Возникла ошибка при запросе операции. Обратитесь в поддержку';
                            return [2 /*return*/, returnObject];
                        }
                        returnObject.operation = result;
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    OperationsService.addIncomeExpense = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var returnObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnObject = {
                            error: false,
                            operation: null
                        };
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations', "POST", true, body)];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result) {
                            (returnObject).error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
                            return [2 /*return*/, returnObject];
                        }
                        returnObject.operation.id = result.id;
                        returnObject.operation.type = result.type;
                        returnObject.operation.amount = result.amount;
                        returnObject.operation.date = result.date;
                        returnObject.operation.comment = result.comment;
                        returnObject.operation.category = result.category;
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    OperationsService.editOperation = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var returnObject, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnObject = {
                            error: false,
                            operation: null
                        };
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations/' + id, "PUT", true, data)];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result) {
                            returnObject.error = 'Возникла ошибка при редактировании дохода или расхода. Обратитесь в поддержку';
                        }
                        return [2 /*return*/, returnObject];
                }
            });
        });
    };
    OperationsService.deleteIncomeExpenseCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, http_utils_1.HttpUtils.request('/operations/' + id, "DELETE", true)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Возникла ошибка при удалении операции. Обратитесь в поддержку');
                            return [2 /*return*/, false];
                        }
                        console.log('Удаление операции прошло успешно');
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return OperationsService;
}());
exports.OperationsService = OperationsService;
//# sourceMappingURL=operations-service.js.map
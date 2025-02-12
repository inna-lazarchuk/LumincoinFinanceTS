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
exports.IncomeExpenseEdit = void 0;
var operations_service_1 = require("../../services/operations-service");
var income_service_1 = require("../../services/income-service");
var expenses_service_1 = require("../../services/expenses-service");
var IncomeExpenseEdit = /** @class */ (function () {
    function IncomeExpenseEdit(openNewRoute) {
        var _this = this;
        this.openNewRoute = openNewRoute;
        this.id = parseInt(localStorage.getItem('operationId'));
        this.type = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.sum = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        this.categories = null;
        this.getThisOperation(this.id).then();
        this.buttonSaveElement = document.getElementById('edit-save');
        this.buttonCancelElement = document.getElementById('edit-cancel');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener('click', this.editOperation.bind(this));
        }
        if (this.buttonCancelElement) {
            this.buttonCancelElement.addEventListener('click', function () { return _this.openNewRoute('/income-expenses'); });
        }
    }
    IncomeExpenseEdit.prototype.getThisOperation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, findItemIncome, findItemExpense;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, operations_service_1.OperationsService.getOperationById(id)];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result.operation) {
                            console.log('Ошибка запроса');
                            return [2 /*return*/];
                        }
                        this.type.value = result.operation.type;
                        this.type.setAttribute("disabled", "");
                        return [4 /*yield*/, this.getCategories(this.type.value)];
                    case 2:
                        _a.sent();
                        if (this.categories) {
                            findItemIncome = this.categories.find(function (item) { return item.title === result.operation.category; });
                            if (findItemIncome) {
                                this.categorySelect.value = findItemIncome.id.toString();
                            }
                        }
                        if (this.categories) {
                            findItemExpense = this.categories.find(function (item) { return item.title === result.operation.category; });
                            if (findItemExpense) {
                                this.categorySelect.value = findItemExpense.id.toString();
                            }
                        }
                        this.sum.value = result.operation.amount.toString();
                        this.date.value = result.operation.date;
                        this.comment.value = result.operation.comment;
                        return [2 /*return*/];
                }
            });
        });
    };
    IncomeExpenseEdit.prototype.getCategories = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.categorySelect.innerHTML = "";
                        if (!(type === 'income')) return [3 /*break*/, 2];
                        return [4 /*yield*/, income_service_1.IncomeService.getCategories()];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка получения данных');
                        }
                        this.categories = result.category;
                        this.categories.forEach(function (item) {
                            var option = document.createElement('option');
                            option.value = item.id.toString();
                            option.innerText = item.title;
                            _this.categorySelect.appendChild(option);
                        });
                        _a.label = 2;
                    case 2:
                        if (!(type === 'expense')) return [3 /*break*/, 4];
                        return [4 /*yield*/, expenses_service_1.ExpensesService.getCategories()];
                    case 3:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка получения данных');
                        }
                        this.categories = result.category;
                        this.categories.forEach(function (item) {
                            var option = document.createElement('option');
                            option.value = item.id.toString();
                            option.innerText = item.title;
                            _this.categorySelect.appendChild(option);
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    IncomeExpenseEdit.prototype.editOperation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categoryIdValue, numberCategoryId, categorySumValue, numberAmount, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        categoryIdValue = this.categorySelect.value;
                        numberCategoryId = parseInt(categoryIdValue);
                        categorySumValue = this.sum.value;
                        numberAmount = parseInt(categorySumValue);
                        data = {
                            type: this.type.value,
                            amount: numberAmount,
                            date: this.date.value,
                            comment: this.comment.value,
                            category_id: numberCategoryId
                        };
                        return [4 /*yield*/, operations_service_1.OperationsService.editOperation(this.id, data)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log(result.error);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, this.openNewRoute('/income-expenses')];
                }
            });
        });
    };
    return IncomeExpenseEdit;
}());
exports.IncomeExpenseEdit = IncomeExpenseEdit;
//# sourceMappingURL=income-expense-edit.js.map
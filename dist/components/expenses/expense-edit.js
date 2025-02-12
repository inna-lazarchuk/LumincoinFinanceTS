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
exports.ExpenseEdit = void 0;
var expenses_service_1 = require("../../services/expenses-service");
var ExpenseEdit = /** @class */ (function () {
    function ExpenseEdit(openNewRoute) {
        var _this = this;
        this.openNewRoute = openNewRoute;
        this.id = null;
        if (localStorage.getItem('categoryId')) {
            this.id = parseInt(localStorage.getItem('categoryId'));
        }
        if (this.id) {
            this.getCategory(this.id).then();
        }
        this.buttonSaveElement = document.getElementById('edit-save');
        this.buttonCancelElement = document.getElementById('edit-cancel');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener('click', this.editCategory.bind(this));
        }
        if (this.buttonCancelElement) {
            this.buttonCancelElement.addEventListener('click', function () { return _this.openNewRoute('/expenses'); });
        }
    }
    ExpenseEdit.prototype.getCategory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, createBlock, inputElement, actionsElement, buttonSaveElement, buttonCancelElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expenses_service_1.ExpensesService.getCategory(id)];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result.category) {
                            console.log('Ошибка запроса');
                        }
                        createBlock = document.getElementsByClassName('create-block')[0];
                        inputElement = document.createElement('input');
                        inputElement.setAttribute('type', 'text');
                        inputElement.setAttribute('id', 'nameCategoryIncomeEdit');
                        inputElement.setAttribute('value', result.category.title);
                        inputElement.classList.add('form-control');
                        actionsElement = document.createElement('div');
                        actionsElement.classList.add('page-item-actions', 'd-flex');
                        buttonSaveElement = document.createElement('button');
                        buttonSaveElement.setAttribute('type', 'button');
                        buttonSaveElement.classList.add('btn', 'btn-success');
                        buttonSaveElement.setAttribute('id', 'edit-save');
                        buttonSaveElement.innerText = 'Сохранить';
                        buttonCancelElement = document.createElement('button');
                        buttonCancelElement.setAttribute('type', 'button');
                        buttonCancelElement.classList.add('btn', 'btn-danger');
                        buttonCancelElement.setAttribute('id', 'edit-cancel');
                        buttonCancelElement.innerText = 'Отмена';
                        actionsElement.appendChild(buttonSaveElement);
                        actionsElement.appendChild(buttonCancelElement);
                        createBlock.appendChild(inputElement);
                        createBlock.appendChild(actionsElement);
                        return [2 /*return*/];
                }
            });
        });
    };
    ExpenseEdit.prototype.editCategory = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var id, newTitleCategory, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        id = this.id;
                        newTitleCategory = document.getElementById('nameCategoryIncomeEdit').value;
                        return [4 /*yield*/, expenses_service_1.ExpensesService.editCategory(id, newTitleCategory)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка запроса');
                        }
                        return [2 /*return*/, this.openNewRoute('/expenses')];
                }
            });
        });
    };
    return ExpenseEdit;
}());
exports.ExpenseEdit = ExpenseEdit;
//# sourceMappingURL=expense-edit.js.map
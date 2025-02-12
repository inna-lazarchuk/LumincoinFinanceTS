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
exports.Income = void 0;
var income_service_1 = require("../../services/income-service");
var Income = /** @class */ (function () {
    function Income(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getAllCategoriesIncome().then();
    }
    Income.prototype.getAllCategoriesIncome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, income_service_1.IncomeService.getCategories()];
                    case 1:
                        response = _a.sent();
                        if (response.error) {
                            console.log(response.error);
                            return [2 /*return*/];
                        }
                        console.log(response);
                        this.showCategories(response.category);
                        return [2 /*return*/];
                }
            });
        });
    };
    Income.prototype.showCategories = function (categories) {
        var _this = this;
        var categoriesItemsElement = document.getElementById('categoriesItems');
        categories.forEach(function (category) {
            var categoryElement = document.createElement('div');
            categoryElement.classList.add('page-item');
            categoryElement.setAttribute('id', category.id.toString());
            var titleElement = document.createElement('h3');
            titleElement.innerText = category.title;
            var actionsElement = document.createElement('div');
            actionsElement.classList.add('page-item-actions', 'd-flex');
            var buttonEditElement = document.createElement('button');
            buttonEditElement.setAttribute('type', 'button');
            buttonEditElement.classList.add('btn', 'btn-primary', 'button-edit');
            buttonEditElement.innerText = 'Редактировать';
            buttonEditElement.addEventListener('click', function () {
                localStorage.setItem('categoryId', category.id.toString());
                localStorage.setItem('placeholder', category.title);
                _this.openNewRoute('/income-edit');
            });
            var buttonDeleteElement = document.createElement('button');
            buttonDeleteElement.setAttribute('type', 'button');
            buttonDeleteElement.classList.add('btn', 'btn-danger', 'button-delete');
            buttonDeleteElement.innerText = 'Удалить';
            buttonDeleteElement.addEventListener('click', function () {
                localStorage.setItem('categoryId', category.id.toString());
                _this.openNewRoute('/income-delete');
            });
            actionsElement.appendChild(buttonEditElement);
            actionsElement.appendChild(buttonDeleteElement);
            categoryElement.appendChild(titleElement);
            categoryElement.appendChild(actionsElement);
            if (categoriesItemsElement) {
                categoriesItemsElement.appendChild(categoryElement);
            }
        });
        var categoryLastElement = document.createElement('div');
        categoryLastElement.classList.add('page-item', 'd-flex', 'justify-content-center', 'align-items-center');
        var pageAddElement = document.createElement('div');
        pageAddElement.classList.add('page-item-add');
        pageAddElement.innerText = '+';
        categoryLastElement.appendChild(pageAddElement);
        if (categoriesItemsElement) {
            categoriesItemsElement.appendChild(categoryLastElement);
        }
        categoryLastElement.addEventListener('click', function () { return _this.openNewRoute('/income-create'); });
    };
    return Income;
}());
exports.Income = Income;
//# sourceMappingURL=income.js.map
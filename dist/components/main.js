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
exports.Main = void 0;
var auto_1 = require("chart.js/auto");
var operations_service_1 = require("../services/operations-service");
var periodForButton_enum_1 = require("../types/periodForButton.enum");
var Main = /** @class */ (function () {
    function Main(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.buttonToday = document.getElementById('buttonToday');
        this.buttonWeek = document.getElementById('buttonWeek');
        this.buttonMonth = document.getElementById('buttonMonth');
        this.buttonYear = document.getElementById('buttonYear');
        this.buttonAll = document.getElementById('buttonAll');
        this.buttonInterval = document.getElementById('buttonInterval');
        this.dateFrom = document.getElementById('inputFrom');
        this.dateTo = document.getElementById('inputTo');
        this.buttonAction().then();
        this.getAllOperations('day').then();
        this.allOperations = null;
        this.dataIncome = {};
        this.dataExpenses = {};
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.diagramIncome = null;
        this.diagramExpenses = null;
        this.income = [];
        this.expenses = [];
    }
    Main.prototype.buttonAction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.buttonToday.addEventListener('click', function () {
                    _this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.day);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonToday) {
                        _this.buttonToday.classList.add('active');
                    }
                });
                this.buttonWeek.addEventListener('click', function () {
                    _this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.week);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonWeek) {
                        _this.buttonWeek.classList.add('active');
                    }
                });
                this.buttonMonth.addEventListener('click', function () {
                    _this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.month);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonMonth) {
                        _this.buttonMonth.classList.add('active');
                    }
                });
                this.buttonYear.addEventListener('click', function () {
                    _this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.year);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonYear) {
                        _this.buttonYear.classList.add('active');
                    }
                });
                this.buttonAll.addEventListener('click', function () {
                    _this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.all);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonAll) {
                        _this.buttonAll.classList.add('active');
                    }
                });
                this.buttonInterval.addEventListener('click', function () {
                    var body = {
                        dateFrom: _this.dateFrom.value,
                        dateTo: _this.dateTo.value
                    };
                    _this.getAllOperationsInterval(periodForButton_enum_1.PeriodForButtonEnum.interval, body);
                    document.querySelectorAll('.navigation-times .btn').forEach(function (button) {
                        button.classList.remove('active');
                    });
                    if (_this.buttonInterval) {
                        _this.buttonInterval.classList.add('active');
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    Main.prototype.getAllOperations = function (period) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.labelsIncome = [];
                        this.amountsIncome = [];
                        this.labelsExpenses = [];
                        this.amountsExpenses = [];
                        this.income = [];
                        this.expenses = [];
                        if (this.diagramIncome) {
                            this.diagramIncome.destroy();
                        }
                        if (this.diagramExpenses) {
                            this.diagramExpenses.destroy();
                        }
                        return [4 /*yield*/, operations_service_1.OperationsService.getAllOperationsPeriod(period)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка при получении данных');
                            return [2 /*return*/, this.openNewRoute('/')];
                        }
                        if (result.allOperations && result.allOperations.length === 0) {
                            console.log('Нет операций в выбранном периоде');
                            return [2 /*return*/];
                        }
                        this.allOperations = result.allOperations;
                        if (this.allOperations) {
                            this.allOperations.forEach(function (operation) {
                                if (operation.type === 'income') {
                                    if (_this.income.length === 0) {
                                        _this.income.push({
                                            category: operation.category,
                                            amount: +operation.amount
                                        });
                                    }
                                    else {
                                        var categoryAlreadyInIncome = _this.income.find(function (item) { return item.category === operation.category; });
                                        if (categoryAlreadyInIncome) {
                                            categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                                        }
                                        else {
                                            _this.income.push({
                                                category: operation.category,
                                                amount: +operation.amount
                                            });
                                        }
                                    }
                                }
                                if (operation.type === 'expense') {
                                    if (_this.expenses.length === 0) {
                                        _this.expenses.push({
                                            category: operation.category,
                                            amount: +operation.amount
                                        });
                                    }
                                    else {
                                        var categoryAlreadyInExpenses = _this.expenses.find(function (item) { return item.category === operation.category; });
                                        if (categoryAlreadyInExpenses) {
                                            categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                                        }
                                        else {
                                            _this.expenses.push({
                                                category: operation.category,
                                                amount: +operation.amount
                                            });
                                        }
                                    }
                                }
                            });
                        }
                        this.income.forEach(function (income) {
                            _this.labelsIncome.push(income.category);
                            _this.amountsIncome.push(income.amount);
                        });
                        this.expenses.forEach(function (expense) {
                            _this.labelsIncome.push(expense.category);
                            _this.amountsIncome.push(expense.amount);
                        });
                        this.constructorDiagrams();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.getAllOperationsInterval = function (period, body) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.labelsIncome = [];
                        this.amountsIncome = [];
                        this.labelsExpenses = [];
                        this.amountsExpenses = [];
                        this.income = [];
                        this.expenses = [];
                        if (this.diagramIncome) {
                            this.diagramIncome.destroy();
                        }
                        if (this.diagramExpenses) {
                            this.diagramExpenses.destroy();
                        }
                        return [4 /*yield*/, operations_service_1.OperationsService.getAllOperationsInterval(period, body)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка при получении данных');
                            return [2 /*return*/, this.openNewRoute('/')];
                        }
                        if (result.allOperations && result.allOperations.length === 0) {
                            console.log('Нет операций в выбранном периоде');
                            return [2 /*return*/];
                        }
                        this.allOperations = result.allOperations;
                        if (this.allOperations) {
                            this.allOperations.forEach(function (operation) {
                                if (operation.type === 'income') {
                                    if (_this.income.length === 0) {
                                        _this.income.push({
                                            category: operation.category,
                                            amount: +operation.amount
                                        });
                                    }
                                    else {
                                        var categoryAlreadyInIncome = _this.income.find(function (item) { return item.category === operation.category; });
                                        if (categoryAlreadyInIncome) {
                                            categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                                        }
                                        else {
                                            _this.income.push({
                                                category: operation.category,
                                                amount: +operation.amount
                                            });
                                        }
                                    }
                                }
                                if (operation.type === 'expense') {
                                    if (_this.expenses.length === 0) {
                                        _this.expenses.push({
                                            category: operation.category,
                                            amount: +operation.amount
                                        });
                                    }
                                    else {
                                        var categoryAlreadyInExpenses = _this.expenses.find(function (item) { return item.category === operation.category; });
                                        if (categoryAlreadyInExpenses) {
                                            categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                                        }
                                        else {
                                            _this.expenses.push({
                                                category: operation.category,
                                                amount: +operation.amount
                                            });
                                        }
                                    }
                                }
                            });
                        }
                        this.income.forEach(function (income) {
                            _this.labelsIncome.push(income.category);
                            _this.amountsIncome.push(income.amount);
                        });
                        this.expenses.forEach(function (expense) {
                            _this.labelsIncome.push(expense.category);
                            _this.amountsIncome.push(expense.amount);
                        });
                        this.constructorDiagrams();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.constructorDiagrams = function () {
        var myDiagramIncomeCanvas = document.getElementById('myDiagramIncome');
        var myDiagramExpensesCanvas = document.getElementById('myDiagramExpenses');
        this.dataIncome = {
            labels: this.labelsIncome,
            datasets: [{
                    label: 'Сумма, $',
                    data: this.amountsIncome,
                    backgroundColor: [
                        '#DC3545',
                        '#FD7E14',
                        '#FFC107',
                        '#20C997',
                        '#0D6EFD',
                    ],
                    hoverOffset: 4
                }]
        };
        this.diagramIncome = new auto_1.Chart(myDiagramIncomeCanvas, {
            type: 'pie',
            data: this.dataIncome,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                }
            }
        });
        this.dataExpenses = {
            labels: this.labelsExpenses,
            datasets: [{
                    label: 'Сумма, $',
                    data: this.amountsExpenses,
                    backgroundColor: [
                        '#DC3545',
                        '#FD7E14',
                        '#FFC107',
                        '#20C997',
                        '#0D6EFD',
                    ],
                    hoverOffset: 4
                }]
        };
        this.diagramExpenses = new auto_1.Chart(myDiagramExpensesCanvas, {
            type: 'pie',
            data: this.dataExpenses,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    };
    return Main;
}());
exports.Main = Main;
//# sourceMappingURL=main.js.map
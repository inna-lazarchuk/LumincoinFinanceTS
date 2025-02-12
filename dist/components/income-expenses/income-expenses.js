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
exports.IncomeExpenses = void 0;
var operations_service_1 = require("../../services/operations-service");
var periodForButton_enum_1 = require("../../types/periodForButton.enum");
var IncomeExpenses = /** @class */ (function () {
    function IncomeExpenses(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.buttonToday = document.getElementById('buttonToday');
        this.buttonWeek = document.getElementById('buttonWeek');
        this.buttonMonth = document.getElementById('buttonMonth');
        this.buttonYear = document.getElementById('buttonYear');
        this.buttonAll = document.getElementById('buttonAll');
        this.buttonInterval = document.getElementById('buttonInterval');
        this.dateFrom = document.getElementById('inputFrom');
        this.dateTo = document.getElementById('inputTo');
        this.recordsElement = document.getElementById('recordsIncomeExpenses');
        this.buttonAction().then();
        this.getAllOperations(periodForButton_enum_1.PeriodForButtonEnum.day).then();
    }
    IncomeExpenses.prototype.buttonAction = function () {
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
    IncomeExpenses.prototype.getAllOperations = function (period) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, operations_service_1.OperationsService.getAllOperationsPeriod(period)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка при получении данных');
                            return [2 /*return*/, this.openNewRoute('/')];
                        }
                        if (result.allOperations.length === 0) {
                            console.log('Нет операций в выбранном периоде');
                            if (this.recordsElement) {
                                this.recordsElement.innerHTML = '';
                            }
                            return [2 /*return*/];
                        }
                        console.log(result);
                        return [4 /*yield*/, this.createTableIncomeExpenses(result.allOperations)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IncomeExpenses.prototype.getAllOperationsInterval = function (period, body) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, operations_service_1.OperationsService.getAllOperationsInterval(period, body)];
                    case 1:
                        result = _a.sent();
                        if (result.error) {
                            console.log('Ошибка при получении данных');
                            return [2 /*return*/, this.openNewRoute('/')];
                        }
                        if (result.allOperations && result.allOperations.length === 0) {
                            console.log('Нет операций в выбранном периоде');
                            if (this.recordsElement) {
                                this.recordsElement.innerHTML = '';
                            }
                            return [2 /*return*/];
                        }
                        console.log(result);
                        return [4 /*yield*/, this.createTableIncomeExpenses(result.allOperations)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IncomeExpenses.prototype.createTableIncomeExpenses = function (operations) {
        return __awaiter(this, void 0, void 0, function () {
            var that, _loop_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                that = this;
                if (that.recordsElement) {
                    that.recordsElement.innerHTML = '';
                }
                _loop_1 = function (i) {
                    var trElement = document.createElement('tr');
                    trElement.insertCell().innerText = (i + 1).toString();
                    if (operations[i].type === 'income') {
                        var trElementColor = trElement.insertCell();
                        trElementColor.innerText = 'доход';
                        trElementColor.classList.add('text-success');
                    }
                    if (operations[i].type === 'expense') {
                        var trElementColor = trElement.insertCell();
                        trElementColor.innerText = 'расход';
                        trElementColor.classList.add('text-danger');
                    }
                    trElement.insertCell().innerText = operations[i].category.toLowerCase();
                    var amountElement = trElement.insertCell().innerText;
                    var parseAmountElement = parseInt(amountElement);
                    parseAmountElement = operations[i].amount;
                    trElement.insertCell().innerText = operations[i].date;
                    trElement.insertCell().innerText = operations[i].comment.toLowerCase();
                    trElement.insertCell().innerHTML = '<svg class="deleteIcon" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">\n' +
                        '                        <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z"\n' +
                        '                              fill="black"/>\n' +
                        '                        <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z"\n' +
                        '                              fill="black"/>\n' +
                        '                        <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z"\n' +
                        '                              fill="black"/>\n' +
                        '                        <path fill-rule="evenodd" clip-rule="evenodd"\n' +
                        '                              d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z"\n' +
                        '                              fill="black"/>\n' +
                        '                    </svg> <svg class="editIcon" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">\\n\' +\n' +
                        '                                          <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z"\\n\' +\n' +
                        '                                                 fill="black"/>\\n\' +\n' +
                        '                                        </svg>';
                    if (that.recordsElement) {
                        that.recordsElement.appendChild(trElement);
                    }
                    document.getElementsByClassName('deleteIcon')[i].addEventListener('click', function () {
                        localStorage.setItem('operationId', operations[i].id.toString());
                        _this.openNewRoute('/income-expense-delete');
                    });
                    document.getElementsByClassName('editIcon')[i].addEventListener('click', function () {
                        localStorage.setItem('operationId', operations[i].id.toString());
                        _this.openNewRoute('/income-expense-edit');
                    });
                };
                for (i = 0; i < operations.length; i++) {
                    _loop_1(i);
                }
                return [2 /*return*/];
            });
        });
    };
    return IncomeExpenses;
}());
exports.IncomeExpenses = IncomeExpenses;
//# sourceMappingURL=income-expenses.js.map
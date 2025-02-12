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
exports.Router = void 0;
var main_1 = require("./components/main");
var form_1 = require("./components/form");
var expenses_1 = require("./components/expenses/expenses");
var income_1 = require("./components/income/income");
var income_expenses_1 = require("./components/income-expenses/income-expenses");
var auth_utils_1 = require("./utils/auth-utils");
var income_edit_1 = require("./components/income/income-edit");
var income_delete_1 = require("./components/income/income-delete");
var income_create_1 = require("./components/income/income-create");
var income_expense_create_1 = require("./components/income-expenses/income-expense-create");
var expense_edit_1 = require("./components/expenses/expense-edit");
var expense_delete_1 = require("./components/expenses/expense-delete");
var expense_create_1 = require("./components/expenses/expense-create");
var income_expense_edit_1 = require("./components/income-expenses/income-expense-edit");
var income_expense_delete_1 = require("./components/income-expenses/income-expense-delete");
var logout_1 = require("./components/logout");
var http_utils_1 = require("./utils/http-utils");
var Router = /** @class */ (function () {
    function Router() {
        var _this = this;
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.userName = null;
        this.profileNameElement = document.getElementById('profile-name');
        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/main.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new main_1.Main(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/sign-in',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-in.html',
                useLayout: false,
                load: function () {
                    new form_1.Form('sign-in', _this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: function () {
                    new form_1.Form('login', _this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/logout',
                title: 'Выход из аккаунта',
                useLayout: false,
                load: function () {
                    new logout_1.Logout(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/expenses/expenses.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new expenses_1.Expenses(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/expense-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/expenses/expense-edit.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new expense_edit_1.ExpenseEdit(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/expense-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/expenses/expense-delete.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new expense_delete_1.ExpenseDelete(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/expense-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/expenses/expense-create.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new expense_create_1.ExpenseCreate(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/income/income.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_1.Income(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/income/income-edit.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_edit_1.IncomeEdit(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/income/income-delete.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_delete_1.IncomeDelete(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/income/income-create.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_create_1.IncomeCreate(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/income-expenses/income-expenses.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_expenses_1.IncomeExpenses(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-expense-create',
                title: 'Создание дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-create.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_expense_create_1.IncomeExpenseCreate(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-expense-edit',
                title: 'Редактирование дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-edit.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_expense_edit_1.IncomeExpenseEdit(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
            {
                route: '/income-expense-delete',
                title: 'Удаление дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-delete.html',
                useLayout: '/templates/layout.html',
                load: function () {
                    new income_expense_delete_1.IncomeExpenseDelete(_this.openNewRoute.bind(_this));
                },
                unload: function () { }
            },
        ];
    }
    Router.prototype.initEvents = function () {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    };
    Router.prototype.activateRoute = function () {
        return __awaiter(this, arguments, void 0, function (event, oldRoute, url) {
            var userInfo, accessToken, urlRoute, currentRoute, urlRoute_1, newRoute, contentBlock, _a, userInfo_1, _b;
            if (event === void 0) { event = null; }
            if (oldRoute === void 0) { oldRoute = null; }
            if (url === void 0) { url = null; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userInfo = auth_utils_1.AuthUtils.getAuthInfo();
                        accessToken = userInfo.accessToken;
                        urlRoute = window.location.pathname;
                        if (!((userInfo && accessToken) || (urlRoute === "/login") || (urlRoute === "/sign-in"))) return [3 /*break*/, 10];
                        if (oldRoute) {
                            currentRoute = this.routes.find(function (item) { return item.route === oldRoute; });
                            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                                currentRoute.unload();
                            }
                        }
                        urlRoute_1 = window.location.pathname;
                        newRoute = this.routes.find(function (item) { return item.route === urlRoute_1; });
                        if (!newRoute) return [3 /*break*/, 7];
                        if (newRoute.title) {
                            if (this.titlePageElement) {
                                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
                            }
                        }
                        if (!newRoute.filePathTemplate) return [3 /*break*/, 6];
                        contentBlock = this.contentPageElement;
                        if (!newRoute.useLayout) return [3 /*break*/, 4];
                        if (!this.contentPageElement) return [3 /*break*/, 2];
                        _a = this.contentPageElement;
                        return [4 /*yield*/, fetch(newRoute.useLayout)
                                .then(function (response) { return response.text(); })];
                    case 1:
                        _a.innerHTML = _c.sent();
                        _c.label = 2;
                    case 2:
                        contentBlock = document.getElementById('content-layout');
                        if (!this.userName) {
                            userInfo_1 = auth_utils_1.AuthUtils.getAuthInfo(auth_utils_1.AuthUtils.userInfoTokenKey);
                            if (userInfo_1) {
                                // userInfo = JSON.parse(userInfo);
                                if (userInfo_1.userInfo.name) {
                                    this.userName = userInfo_1.userInfo.name;
                                }
                            }
                        }
                        if (this.profileNameElement) {
                            this.profileNameElement.innerText = this.userName;
                        }
                        this.activateMenuItem(newRoute);
                        return [4 /*yield*/, this.getBalance()];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!contentBlock) return [3 /*break*/, 6];
                        _b = contentBlock;
                        return [4 /*yield*/, fetch(newRoute.filePathTemplate)
                                .then(function (response) { return response.text(); })];
                    case 5:
                        _b.innerHTML = _c.sent();
                        _c.label = 6;
                    case 6:
                        if (newRoute.load && typeof newRoute.load === 'function') {
                            newRoute.load();
                        }
                        return [3 /*break*/, 9];
                    case 7:
                        console.log('No route found');
                        history.pushState({}, '');
                        return [4 /*yield*/, this.activateRoute(null, null, '/signup')];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.openNewRoute('/login')];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.openNewRoute = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var currentRoute;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentRoute = window.location.pathname;
                        history.pushState({}, '', url);
                        return [4 /*yield*/, this.activateRoute(null, null, currentRoute)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.clickHandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var element, currentRoute, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = null;
                        if (e.target.nodeName === 'A') {
                            element = e.target;
                        }
                        else if (e.target.parentNode.nodeName === 'A') {
                            element = e.target.parentNode;
                        }
                        if (!element) return [3 /*break*/, 2];
                        e.preventDefault();
                        currentRoute = window.location.pathname;
                        url = element.href.replace(window.location.origin, '');
                        if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.openNewRoute(url)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.activateMenuItem = function (route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(function (item) {
            var href = item.getAttribute('href');
            if (href) {
                if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                    item.classList.add('active');
                }
                else {
                    item.classList.remove('active');
                }
            }
        });
    };
    Router.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balance, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        balance = document.getElementById('balance');
                        if (!balance) return [3 /*break*/, 2];
                        return [4 /*yield*/, http_utils_1.HttpUtils.request('/balance')];
                    case 1:
                        result = _a.sent();
                        if (result.error || !result.response.balance) {
                            console.log('Данные о балансе не получены');
                            balance.innerText = '???';
                        }
                        balance.innerText = result.response.balance + '$';
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map
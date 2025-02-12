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
exports.Form = void 0;
var auth_utils_1 = require("../utils/auth-utils");
var auth_service_1 = require("../services/auth-service");
var Form = /** @class */ (function () {
    function Form(page, openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.passwordElement = document.getElementById('password');
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ];
        if (this.page === 'sign-in') {
            this.fields.unshift({
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            }, {
                name: 'lastName',
                id: 'lastName',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/,
                valid: false,
            }, {
                name: 'passwordRepeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            });
        }
        var that = this;
        this.fields.forEach(function (item) {
            item.element = document.getElementById(item.id);
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, this);
                };
            }
        });
        this.processElement = document.getElementById('process');
        if (this.processElement) {
            this.processElement.onclick = function () {
                that.processForm().then();
            };
        }
    }
    Form.prototype.validateField = function (field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        }
        else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        if (field.name === 'passwordRepeat') {
            if (this.passwordElement && this.passwordElement.value === element.value) {
                element.classList.remove('is-invalid');
                field.valid = true;
            }
            else {
                element.classList.add('is-invalid');
                field.valid = false;
            }
        }
        this.validateForm();
    };
    Form.prototype.validateForm = function () {
        var validForm = this.fields.every(function (item) { return item.valid; });
        if (this.processElement) {
            if (validForm) {
                this.processElement.removeAttribute('disabled');
                return true;
            }
            else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
        }
        return validForm;
    };
    Form.prototype.processForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSignIn, dataLogin, nameElement, lastNameElement, emailElement, passwordElement, passwordRepeatElement, signUpResult, loginResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateForm()) return [3 /*break*/, 4];
                        dataSignIn = {
                            name: null,
                            lastName: null,
                            email: null,
                            password: null,
                            passwordRepeat: null,
                        };
                        dataLogin = {
                            email: null,
                            password: null,
                        };
                        nameElement = this.fields.find(function (item) { return item.name === 'name'; });
                        if (nameElement && nameElement.element) {
                            dataSignIn.name = nameElement.element.value;
                        }
                        lastNameElement = this.fields.find(function (item) { return item.name === 'lastName'; });
                        if (lastNameElement && lastNameElement.element) {
                            dataSignIn.lastName = lastNameElement.element.value;
                        }
                        emailElement = this.fields.find(function (item) { return item.name === 'email'; });
                        if (emailElement && emailElement.element) {
                            dataSignIn.email = emailElement.element.value;
                            dataLogin.email = emailElement.element.value;
                        }
                        passwordElement = this.fields.find(function (item) { return item.name === 'password'; });
                        if (passwordElement && passwordElement.element) {
                            dataSignIn.password = passwordElement.element.value;
                            dataLogin.password = passwordElement.element.value;
                        }
                        passwordRepeatElement = this.fields.find(function (item) { return item.name === 'passwordRepeat'; });
                        if (passwordRepeatElement && passwordRepeatElement.element) {
                            dataSignIn.passwordRepeat = passwordRepeatElement.element.value;
                        }
                        if (!(this.page === 'sign-in')) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth_service_1.AuthService.signUp(dataSignIn)];
                    case 1:
                        signUpResult = _a.sent();
                        if (signUpResult) {
                            auth_utils_1.AuthUtils.setAuthInfo(null, null, {
                                id: signUpResult.user.id,
                                name: signUpResult.user.name + ' ' + signUpResult.user.lastName,
                            });
                            this.openNewRoute('/');
                        }
                        else {
                            console.log('Ответ на запрос имеет некорректные данные');
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, auth_service_1.AuthService.logIn(dataLogin)];
                    case 3:
                        loginResult = _a.sent();
                        if (loginResult) {
                            auth_utils_1.AuthUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, {
                                id: loginResult.user.id,
                                name: loginResult.user.name + ' ' + loginResult.user.lastName
                            });
                            this.openNewRoute('/');
                        }
                        else {
                            console.log('Ответ на запрос имеет некорректные данные');
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=form.js.map
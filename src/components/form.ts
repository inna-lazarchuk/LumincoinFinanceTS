import {AuthUtils} from "../utils/auth-utils";
import {AuthService} from "../services/auth-service";
import {FormFieldsType} from "../types/form.type";
import {LoginDataType, LoginResponseType, SignInBodyType, SignInResponseType} from "../types/authService.type";

export class Form {
    private openNewRoute: (url: string) => Promise<void>;
    readonly page: 'login' | 'sign-in';
    private passwordElement: HTMLInputElement | null;
    private fields: FormFieldsType[];
    private processElement: HTMLElement | null;

    constructor(page: 'login' | 'sign-in', openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.passwordElement = document.getElementById('password') as HTMLInputElement;
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
        ]

        if (this.page === 'sign-in') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+\s*$/,
                    valid: false,
                },
                {
                    name: 'lastName',
                    id: 'lastName',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+\s*$/,
                    valid: false,
                },
                {
                    name: 'passwordRepeat',
                    id: 'passwordRepeat',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false,
                }
            );
        }

        const that: Form = this;
        this.fields.forEach((item: FormFieldsType) => {
            item.element = document.getElementById(item.id) as HTMLInputElement;
            if(item.element){
                item.element.onchange = function (): void {
                    that.validateField.call(that, item, <HTMLInputElement>this);
                }
            }
        });

        this.processElement = document.getElementById('process');
        if(this.processElement){
            this.processElement.onclick = function (): void {
                that.processForm().then();
            }
        }
    }

    private validateField(field: FormFieldsType, element: HTMLInputElement): void {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        if (field.name === 'passwordRepeat') {
            if (this.passwordElement && this.passwordElement.value === element.value) {
                element.classList.remove('is-invalid');
                field.valid = true;
            } else {
                element.classList.add('is-invalid');
                field.valid = false;
            }
        }
        this.validateForm();
    }

    private validateForm(): boolean {
        const validForm: boolean = this.fields.every((item: FormFieldsType) => item.valid);

        if(this.processElement){
            if (validForm) {
                this.processElement.removeAttribute('disabled');
                return true;
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
        }

        return validForm;
    }

    private async processForm(): Promise<void> {
        if (this.validateForm()) {
            let dataSignIn: SignInBodyType = {
                name: null,
                lastName: null,
                email: null,
                password: null,
                passwordRepeat: null,
            }

            let dataLogin: LoginDataType = {
                email: null,
                password: null,
            }
            const nameElement: FormFieldsType | undefined = this.fields.find((item: FormFieldsType) => item.name === 'name');
            if(nameElement && nameElement.element){
                dataSignIn.name = nameElement.element.value;
            }

            const lastNameElement: FormFieldsType | undefined = this.fields.find((item: FormFieldsType) => item.name === 'lastName');
            if(lastNameElement && lastNameElement.element){
                dataSignIn.lastName = lastNameElement.element.value;
            }

            const emailElement: FormFieldsType | undefined = this.fields.find((item: FormFieldsType) => item.name === 'email');
            if(emailElement && emailElement.element){
                dataSignIn.email = emailElement.element.value;
                dataLogin.email = emailElement.element.value;
            }

            const passwordElement: FormFieldsType | undefined = this.fields.find((item: FormFieldsType) => item.name === 'password');
            if(passwordElement && passwordElement.element){
                dataSignIn.password = passwordElement.element.value;
                dataLogin.password = passwordElement.element.value;
            }

            const passwordRepeatElement: FormFieldsType | undefined = this.fields.find((item: FormFieldsType) => item.name === 'passwordRepeat');
            if(passwordRepeatElement && passwordRepeatElement.element){
                dataSignIn.passwordRepeat = passwordRepeatElement.element.value;
            }

            if (this.page === 'sign-in') {
                const signUpResult: SignInResponseType | boolean = await AuthService.signUp(dataSignIn);
                if (signUpResult) {
                    AuthUtils.setAuthInfo(null, null, {
                        id: (signUpResult as SignInResponseType).response.user.id,
                        name: (signUpResult as SignInResponseType).response.user.name + ' ' + (signUpResult as SignInResponseType).response.user.lastName,
                    });
                    await this.openNewRoute('/');
                } else {
                    console.log('Ответ на запрос имеет некорректные данные');
                    return;
                }
            }

            const loginResult: LoginResponseType | boolean = await AuthService.logIn(dataLogin);
            if (loginResult) {
                AuthUtils.setAuthInfo((loginResult as LoginResponseType).response.tokens.accessToken, (loginResult as LoginResponseType).response.tokens.refreshToken, {
                    id: (loginResult as LoginResponseType).response.user.id,
                    name: (loginResult as LoginResponseType).response.user.name + ' ' + (loginResult as LoginResponseType).response.user.lastName
                });

                this.openNewRoute('/');
            } else {
                console.log('Ответ на запрос имеет некорректные данные');
                return;
            }
        }
    }
}

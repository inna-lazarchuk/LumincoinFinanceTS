import {Main} from "./components/main";
import {Form} from "./components/form";
import {Expenses} from "./components/expenses/expenses";
import {Income} from "./components/income/income";
import {IncomeExpenses} from "./components/income-expenses/income-expenses";
import {AuthUtils} from "./utils/auth-utils";
import {IncomeEdit} from "./components/income/income-edit";
import {IncomeDelete} from "./components/income/income-delete";
import {IncomeCreate} from "./components/income/income-create";
import {IncomeExpenseCreate} from "./components/income-expenses/income-expense-create";
import {ExpenseEdit} from "./components/expenses/expense-edit";
import {ExpenseDelete} from "./components/expenses/expense-delete";
import {ExpenseCreate} from "./components/expenses/expense-create";
import {IncomeExpenseEdit} from "./components/income-expenses/income-expense-edit";
import {IncomeExpenseDelete} from "./components/income-expenses/income-expense-delete";
import {Logout} from "./components/logout";
import {HttpUtils} from "./utils/http-utils";
import {RouteType} from "./types/route.type";
import {AuthInfoType, AuthInfoUserNameType} from "./types/authInfo.type";
import {BalanceType} from "./types/balance.type";
import {CommonErrorType} from "./types/commonError.type";

export class Router {
    private titlePageElement: HTMLElement | null;
    readonly contentPageElement: HTMLElement | null;
    private userName: string | null;
    private routes: RouteType[];
    private profileNameElement: HTMLElement | null;
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.userName = null;
        this.profileNameElement = null;

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/main.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new Main(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/sign-in',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-in.html',
                useLayout: false,
                load: (): void => {
                    new Form('sign-in', this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: (): void => {
                    new Form('login', this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/logout',
                title: 'Выход из аккаунта',
                useLayout: false,
                load: (): void => {
                    new Logout(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/expenses/expenses.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new Expenses(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/expense-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/expenses/expense-edit.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new ExpenseEdit(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/expense-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/expenses/expense-delete.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseDelete(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/expense-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/expenses/expense-create.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new ExpenseCreate(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/income/income.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new Income(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/income/income-edit.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/income/income-delete.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeDelete(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/income/income-create.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/income-expenses/income-expenses.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeExpenses(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-expense-create',
                title: 'Создание дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-create.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeExpenseCreate(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-expense-edit',
                title: 'Редактирование дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-edit.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeExpenseEdit(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
            {
                route: '/income-expense-delete',
                title: 'Удаление дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-delete.html',
                useLayout: '/templates/layout.html',
                load: (): void => {
                    new IncomeExpenseDelete(this.openNewRoute.bind(this));
                },
                unload: (): void => {}
            },
        ]
    }

    private initEvents(): void {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    private async activateRoute(event: Event | null = null, oldRoute: RouteType | string |  null = null, url: string | null = null): Promise<void> {
        const userInfo: AuthInfoType = AuthUtils.getAuthInfo() as AuthInfoType;
        const accessToken: string = (userInfo as AuthInfoType).accessToken;
        const urlRoute: string = window.location.pathname;

        if ((userInfo && accessToken) || (urlRoute === "/login") || (urlRoute === "/sign-in")) {
            if (oldRoute) {
                const currentRoute: RouteType | undefined = this.routes.find((item: RouteType) => item.route === oldRoute as string);
                if ((currentRoute as RouteType).unload && typeof (currentRoute as RouteType).unload === 'function') {
                    (currentRoute as RouteType).unload();
                }
            }
            const urlRoute: string = window.location.pathname;
            const newRoute: RouteType | undefined = this.routes.find((item: RouteType) => item.route === urlRoute);
            if (newRoute) {
                if (newRoute.title) {
                    if (this.titlePageElement){
                        this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
                    }
                }

                if (newRoute.filePathTemplate) {
                    let contentBlock: HTMLElement | null = this.contentPageElement;
                    if (newRoute.useLayout) {
                        if (this.contentPageElement){
                            this.contentPageElement.innerHTML = await fetch(newRoute.useLayout as string)
                                .then((response: Response) => response.text());
                        }
                        contentBlock = document.getElementById('content-layout');
                        if (!this.userName) {
                            let userInfo: string | null  = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey) as string | null;
                            if (userInfo) {
                                try {
                                    const parsedUserInfo: AuthInfoUserNameType = JSON.parse(userInfo);
                                    if(parsedUserInfo.name){
                                    this.userName = parsedUserInfo.name}
                                } catch (e) {
                                    console.error('Данные об имени пользователя не получены')
                                }
                            }
                        }
                        this.profileNameElement = document.getElementById('profile-name');
                        if (this.profileNameElement && this.userName) {
                            this.profileNameElement.innerText = this.userName;
                        }
                        this.activateMenuItem(newRoute);
                        await this.getBalance();
                    }

                    if (contentBlock){
                        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate)
                            .then((response: Response) => response.text());
                    }
                }

                if (newRoute.load && typeof newRoute.load === 'function') {
                    newRoute.load();
                }

            } else {
                console.log('No route found');
                history.pushState({}, '');
                await this.activateRoute(null, null,'/signup');
            }
        } else {
            await this.openNewRoute('/login');
        }
    }

    public async openNewRoute(url: string): Promise<void> {
        const currentRoute: string = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, null, currentRoute);
    }

    private async clickHandler(e: Event | HTMLElement): Promise<void> {
        let element: EventTarget | null = null;
        const target = (e as Event).target as HTMLElement;
        if(target && target.nodeName === 'A'){
            element = target;
        } else  if (target && target.parentNode && target.parentNode.nodeName === 'A') {
            element = target.parentNode as HTMLElement;
        }

        if (element) {
            (e as Event).preventDefault();
            const currentRoute: string = window.location.pathname;
            const url: string = (element as HTMLAnchorElement).href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }

    private activateMenuItem(route: RouteType): void {
        document.querySelectorAll('.sidebar .nav-link').forEach((item: Element) => {
            const href: string | null= item.getAttribute('href');
            if(href){
                if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }

    private async getBalance(): Promise<void> {
        const balance: HTMLElement | null = document.getElementById('balance');
        if(balance){
            const result: BalanceType | CommonErrorType = await HttpUtils.request('/balance');
            if ((result as CommonErrorType).error || !(result as BalanceType).response.balance){
                console.log('Данные о балансе не получены');
                balance.innerText= '???';
            }
            balance.innerText = (result as BalanceType).response.balance + '$';
        }
    }
}
import {ExpensesService} from "../../services/expenses-service";
import {ExpenseCategoryType, ExpenseReturnObjectType} from "../../types/expensesService.type";

export class Expenses {
    private openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.getAllCategoriesExpenses().then();
    }

    private async getAllCategoriesExpenses(): Promise<void> {
        const response: ExpenseReturnObjectType = await ExpensesService.getCategories();

        if (response.error) {
            console.log(response.error);
            return;
        }
        console.log(response);
        this.showCategories(response.category as ExpenseCategoryType[]);

    }

    private showCategories(categories: ExpenseCategoryType[]): void {
        const categoriesItemsElement: HTMLElement | null = document.getElementById('categoriesItems');

        categories.forEach((category: ExpenseCategoryType) => {
            const categoryElement: HTMLElement = document.createElement('div');
            if (category.id && category.title) {
                categoryElement.classList.add('page-item');
                categoryElement.setAttribute('id', category.id.toString());
                const titleElement: HTMLElement = document.createElement('h3');
                titleElement.innerText = category.title;
                const actionsElement: HTMLElement = document.createElement('div');
                actionsElement.classList.add('page-item-actions', 'd-flex');
                const buttonEditElement: HTMLElement = document.createElement('button');
                buttonEditElement.setAttribute('type', 'button');
                buttonEditElement.classList.add('btn', 'btn-primary', 'button-edit');
                buttonEditElement.innerText = 'Редактировать';
                buttonEditElement.addEventListener('click', () => {
                        if (category.id && category.title) {
                            localStorage.setItem('categoryId', category.id.toString());
                            localStorage.setItem('placeholder', category.title);
                            this.openNewRoute('/expense-edit')
                        }
                    }
                );

                const buttonDeleteElement: HTMLElement = document.createElement('button');
                buttonDeleteElement.setAttribute('type', 'button');
                buttonDeleteElement.classList.add('btn', 'btn-danger', 'button-delete');
                buttonDeleteElement.innerText = 'Удалить';
                buttonDeleteElement.addEventListener('click', () => {
                    if (category.id) {
                        localStorage.setItem('categoryId', category.id.toString());
                        this.openNewRoute('/expense-delete')
                    }
                });

                actionsElement.appendChild(buttonEditElement);
                actionsElement.appendChild(buttonDeleteElement);
                categoryElement.appendChild(titleElement);
                categoryElement.appendChild(actionsElement);
                if (categoriesItemsElement) {
                    categoriesItemsElement.appendChild(categoryElement);
                }
            }
        })

        const categoryLastElement: HTMLElement = document.createElement('div');
        categoryLastElement.classList.add('page-item', 'd-flex', 'justify-content-center', 'align-items-center');
        const pageAddElement: HTMLElement = document.createElement('div');
        pageAddElement.classList.add('page-item-add');
        pageAddElement.innerText = '+';
        categoryLastElement.appendChild(pageAddElement);
        if (categoriesItemsElement) {
            categoriesItemsElement.appendChild(categoryLastElement);
        }
        categoryLastElement.addEventListener('click', () => this.openNewRoute('/expense-create'));
    }

}
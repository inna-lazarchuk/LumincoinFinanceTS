import {IncomeService} from "../../services/income-service";
import {IncomeResponseType, IncomeReturnObjectType} from "../../types/incomeService.type";

export class Income {
    private openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.getAllCategoriesIncome().then();
    }

    private async getAllCategoriesIncome(): Promise<void> {
        const response: IncomeReturnObjectType = await IncomeService.getCategories();

        if (response.error) {
            console.log(response.error);
            return;
        }
        console.log(response);
        this.showCategories(response.category as IncomeResponseType[]);
    }

    private showCategories(categories: IncomeResponseType[]): void {
        const categoriesItemsElement: HTMLElement | null = document.getElementById('categoriesItems');

        categories.forEach((category: IncomeResponseType) => {
            const categoryElement: HTMLElement = document.createElement('div');
            categoryElement.classList.add('page-item');
            categoryElement.setAttribute('id', category.id.toString());
            const titleElement: HTMLElement = document.createElement('h3');
            titleElement.innerText = category.title;
            const actionsElement: HTMLElement = document.createElement('div');
            actionsElement.classList.add('page-item-actions', 'd-flex');
            const buttonEditElement = document.createElement('button');
            buttonEditElement.setAttribute('type', 'button');
            buttonEditElement.classList.add('btn', 'btn-primary', 'button-edit');
            buttonEditElement.innerText = 'Редактировать';
            buttonEditElement.addEventListener('click', () => {
                localStorage.setItem('categoryId', category.id.toString());
                localStorage.setItem('placeholder', category.title);
                this.openNewRoute('/income-edit')}
            );

            const buttonDeleteElement: HTMLElement = document.createElement('button');
            buttonDeleteElement.setAttribute('type', 'button');
            buttonDeleteElement.classList.add('btn', 'btn-danger', 'button-delete');
            buttonDeleteElement.innerText = 'Удалить';
            buttonDeleteElement.addEventListener('click', () => {
                localStorage.setItem('categoryId', category.id.toString());
                this.openNewRoute('/income-delete')
            });

            actionsElement.appendChild(buttonEditElement);
            actionsElement.appendChild(buttonDeleteElement);
            categoryElement.appendChild(titleElement);
            categoryElement.appendChild(actionsElement);
            if(categoriesItemsElement){
                categoriesItemsElement.appendChild(categoryElement);
            }
        })

        const categoryLastElement: HTMLElement = document.createElement('div');
        categoryLastElement.classList.add('page-item', 'd-flex', 'justify-content-center', 'align-items-center');
        const pageAddElement: HTMLElement = document.createElement('div');
        pageAddElement.classList.add('page-item-add');
        pageAddElement.innerText = '+';
        categoryLastElement.appendChild(pageAddElement);
        if(categoriesItemsElement){
            categoriesItemsElement.appendChild(categoryLastElement);
        }
        categoryLastElement.addEventListener('click', () => this.openNewRoute('/income-create'));
    }
}
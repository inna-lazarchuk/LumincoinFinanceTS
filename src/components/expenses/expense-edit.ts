import {ExpensesService} from "../../services/expenses-service";
import {ExpenseResponseType, ExpenseReturnObjectType} from "../../types/expensesService.type";

export class ExpenseEdit {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number | null;
    private buttonSaveElement: HTMLElement | null;
    private buttonCancelElement: HTMLElement | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = null;
        if (localStorage.getItem('categoryId')) {
            this.id = parseInt(localStorage.getItem('categoryId') as string);
        }
        if(this.id){
            this.getCategory(this.id).then();
        }

        this.buttonSaveElement = document.getElementById('edit-save');
        this.buttonCancelElement = document.getElementById('edit-cancel');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener('click', this.editCategory.bind(this));
        }
        if (this.buttonCancelElement) {
            this.buttonCancelElement.addEventListener('click', () => this.openNewRoute('/expenses'));
        }
    }
    private async getCategory(id: number): Promise<void> {
        let result: ExpenseReturnObjectType = await ExpensesService.getCategory(id);
        if (result.error || !result.category) {
            console.log('Ошибка запроса');
        }

        const createBlock: Element = document.getElementsByClassName('create-block')[0];

        const inputElement: HTMLInputElement = document.createElement('input');
        inputElement.setAttribute('type','text');
        inputElement.setAttribute('id','nameCategoryIncomeEdit');
        inputElement.setAttribute('value',(result.category as ExpenseResponseType).title);
        inputElement.classList.add('form-control');

        const actionsElement: HTMLElement = document.createElement('div');
        actionsElement.classList.add('page-item-actions', 'd-flex');

        const buttonSaveElement: HTMLElement = document.createElement('button');
        buttonSaveElement.setAttribute('type', 'button');
        buttonSaveElement.classList.add('btn','btn-success');
        buttonSaveElement.setAttribute('id', 'edit-save');
        buttonSaveElement.innerText = 'Сохранить';

        const buttonCancelElement: HTMLElement = document.createElement('button');
        buttonCancelElement.setAttribute('type', 'button');
        buttonCancelElement.classList.add('btn','btn-danger');
        buttonCancelElement.setAttribute('id', 'edit-cancel');
        buttonCancelElement.innerText = 'Отмена';

        actionsElement.appendChild(buttonSaveElement);
        actionsElement.appendChild(buttonCancelElement);
        createBlock.appendChild(inputElement);
        createBlock.appendChild(actionsElement);
    }

    async editCategory(e: Event): Promise<void>  {
        e.preventDefault();
        const id: number = this.id as number;
        let newTitleCategory: string = (document.getElementById('nameCategoryIncomeEdit') as HTMLInputElement).value;

        let result: ExpenseReturnObjectType = await ExpensesService.editCategory(id, newTitleCategory);
        if(result.error) {
            console.log('Ошибка запроса');
        }
        return this.openNewRoute('/expenses');
    }
}
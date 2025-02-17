import {IncomeService} from "../../services/income-service";
import {IncomeCategoryType, IncomeReturnObjectType} from "../../types/incomeService.type";

export class IncomeEdit {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number;
    private buttonCancelElement: HTMLElement | null;
    private buttonEditElement: HTMLElement | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = parseInt(localStorage.getItem('categoryId') as string);
        this.getCategory(this.id).then();
        this.buttonCancelElement = null;
        this.buttonEditElement = null;
    }

    private async getCategory(id: number): Promise<void> {
        let result: IncomeReturnObjectType = await IncomeService.getCategory(id);
        if (result.error || !result.category) {
            console.log('Ошибка запроса');
        }
        const createBlock: Element = document.getElementsByClassName('create-block')[0];

        const inputElement: HTMLInputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('id', 'nameCategoryIncomeEdit');
        inputElement.value = (result.category as IncomeCategoryType).title as string;
        inputElement.classList.add('form-control');

        const actionsElement: HTMLElement = document.createElement('div');
        actionsElement.classList.add('page-item-actions', 'd-flex');

        const buttonSaveElement: HTMLElement = document.createElement('button');
        buttonSaveElement.setAttribute('type', 'button');
        buttonSaveElement.classList.add('btn', 'btn-success');
        buttonSaveElement.setAttribute('id', 'edit-save');
        buttonSaveElement.innerText = 'Сохранить';

        const buttonCancelElement: HTMLElement = document.createElement('button');
        buttonCancelElement.setAttribute('type', 'button');
        buttonCancelElement.classList.add('btn', 'btn-danger');
        buttonCancelElement.setAttribute('id', 'edit-cancel');
        buttonCancelElement.innerText = 'Отмена';

        actionsElement.appendChild(buttonSaveElement);
        actionsElement.appendChild(buttonCancelElement);
        createBlock.appendChild(inputElement);
        createBlock.appendChild(actionsElement);

        this.buttonCancelElement = document.getElementById('edit-cancel');
        this.buttonEditElement = document.getElementById('edit-save');
        if (this.buttonEditElement) {
            this.buttonEditElement.addEventListener('click', this.editCategory.bind(this));
        }
        if (this.buttonCancelElement) {
            this.buttonCancelElement.addEventListener('click', () => this.openNewRoute('/income'));
        }
    }

    private async editCategory(e: Event): Promise<void> {
        e.preventDefault();

        const id: number = this.id;
        let newTitleCategory: string = (document.getElementById('nameCategoryIncomeEdit') as HTMLInputElement).value;
        let result: IncomeReturnObjectType = await IncomeService.editCategory(id, newTitleCategory);
        if (result.error) {
            console.log('Ошибка запроса');
        }
        return this.openNewRoute('/income');
    }
}
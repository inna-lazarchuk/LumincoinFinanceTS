import {IncomeService} from "../../services/income-service";
import {OperationsService} from "../../services/operations-service";
import {ExpensesService} from "../../services/expenses-service";
import {IncomeCategoryType, IncomeReturnObjectType} from "../../types/incomeService.type";
import {ExpenseCategoryType, ExpenseReturnObjectType} from "../../types/expensesService.type";
import {IncomeExpensesAddBodyType, OperationReturnObjectType} from "../../types/operationsService.type";

export class IncomeExpenseCreate {
    private openNewRoute: (url: string) => Promise<void>;
    private type: HTMLInputElement;
    private categorySelect: HTMLInputElement;
    private sum: HTMLInputElement;
    private date: HTMLInputElement;
    private comment: HTMLInputElement;
    private saveButtonElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.type = document.getElementById('type-select') as HTMLInputElement;
        this.categorySelect = document.getElementById('category-select') as HTMLInputElement;
        this.sum = document.getElementById('sum') as HTMLInputElement;
        this.date = document.getElementById('date') as HTMLInputElement;
        this.comment = document.getElementById('comment') as HTMLInputElement;
        this.saveButtonElement = document.getElementById('saveButton');
        if(this.saveButtonElement){
            this.saveButtonElement.addEventListener('click', this.saveIncomeExpense.bind(this))
        }
        this.type.addEventListener('change',this.getCategories.bind(this))
        this.getCategories().then();
    }

    private async getCategories(): Promise<void> {
        this.categorySelect.innerHTML = "";
        if (this.type.value === 'income') {
            const result: IncomeReturnObjectType = await IncomeService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            (result.category as IncomeCategoryType[]).forEach((item: IncomeCategoryType) => {
                const option: HTMLOptionElement = document.createElement('option');
                if(item.id && item.title){
                    option.value = item.id.toString();
                    option.innerText = item.title;
                }
                this.categorySelect.appendChild(option);
            })
        }

        if (this.type.value === 'expense') {
            const result: ExpenseReturnObjectType = await ExpensesService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            (result.category as ExpenseCategoryType[]).forEach((item: ExpenseCategoryType) => {
                const option: HTMLOptionElement = document.createElement('option');
                if(item.id && item.title){
                    option.value = item.id.toString();
                    option.innerText = item.title;
                    this.categorySelect.appendChild(option);
                }
            })
        }
    }

    private async saveIncomeExpense(e: Event) :Promise<void> {
        e.preventDefault();
        this.validateInputs();
        if (this.validateInputs()) {
            let categoryIdValue: string = this.categorySelect.value;
            let numberCategoryId: number = parseInt(categoryIdValue);

            let categorySumValue: string = this.sum.value;
            let numberAmount: number = parseInt(categorySumValue);
            const body: IncomeExpensesAddBodyType = {
                type: this.type.value,
                amount: numberAmount,
                date: this.date.value,
                comment: this.comment.value,
                category_id: numberCategoryId
            }

            const result: OperationReturnObjectType = await OperationsService.addIncomeExpense(body);

            if (result.error || !result) {
                alert('Некорректные данные запроса');
            }
            return this.openNewRoute('/income-expenses');
        }

        if (!this.validateInputs()) {
            alert('not ok')
        }
    }

    validateInputs() {
        let isValid: boolean = false;
        if (this.sum.value) {
            this.sum.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.sum.classList.add('is-invalid');
            isValid = false;
        }

        if (this.date.value) {
            this.date.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.date.classList.add('is-invalid');
            isValid = false;
        }

        if (this.comment.value) {
            this.comment.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.comment.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }
}
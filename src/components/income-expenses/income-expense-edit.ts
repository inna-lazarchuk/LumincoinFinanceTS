import {OperationsService} from "../../services/operations-service";
import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";
import {
    IncomeExpensesAddBodyType,
    OperationReturnObjectType, OperationType,
} from "../../types/operationsService.type";
import {IncomeCategoryType, IncomeReturnObjectType} from "../../types/incomeService.type";
import {ExpenseCategoryType, ExpenseReturnObjectType} from "../../types/expensesService.type";

export class IncomeExpenseEdit {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number;
    private type: HTMLInputElement;
    private categorySelect: HTMLInputElement;
    private sum: HTMLInputElement;
    private date: HTMLInputElement;
    private comment: HTMLInputElement;
    private categories: IncomeCategoryType[] | ExpenseCategoryType[] | null;
    readonly buttonSaveElement: HTMLElement | null;
    readonly buttonCancelElement: HTMLElement | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = parseInt(localStorage.getItem('operationId') as string);

        this.type = document.getElementById('type-select') as HTMLInputElement;
        this.categorySelect = document.getElementById('category-select') as HTMLInputElement;
        this.sum = document.getElementById('sum') as HTMLInputElement;
        this.date = document.getElementById('date') as HTMLInputElement;
        this.comment = document.getElementById('comment') as HTMLInputElement;
        this.categories = null;

        this.getThisOperation(this.id).then();

        this.buttonSaveElement = document.getElementById('edit-save');
        this.buttonCancelElement = document.getElementById('edit-cancel');
        if (this.buttonSaveElement) {
            this.buttonSaveElement.addEventListener('click', this.editOperation.bind(this));
        }
        if (this.buttonCancelElement) {
            this.buttonCancelElement.addEventListener('click', () => this.openNewRoute('/income-expenses'));
        }
    }

    private async getThisOperation(id: number): Promise<void> {
        const result: OperationReturnObjectType = await OperationsService.getOperationById(id);
        if (result.error || !result.operation) {
            console.log('Ошибка запроса');
            return;
        }

        this.type.value = result.operation.type;
        this.type.setAttribute("disabled", "");
        await this.getCategories(this.type.value);
        if (this.categories as IncomeCategoryType[]) {
            let findItemIncome: IncomeCategoryType | undefined = (this.categories as IncomeCategoryType[]).find((item: IncomeCategoryType) => item.title === (result.operation as OperationType).category);
            if (findItemIncome && findItemIncome.id) {
                this.categorySelect.value = findItemIncome.id.toString();
            }
        }

        if (this.categories as ExpenseCategoryType[]) {
            let findItemExpense: ExpenseCategoryType | undefined = (this.categories as ExpenseCategoryType[]).find((item: ExpenseCategoryType) => item.title === (result.operation as OperationType).category);
            if (findItemExpense && findItemExpense.id) {
                this.categorySelect.value = findItemExpense.id.toString();
            }
        }
        this.sum.value = result.operation.amount.toString();
        this.date.value = result.operation.date;
        this.comment.value = result.operation.comment;
    }

    private async getCategories(type: string): Promise<void> {
        this.categorySelect.innerHTML = "";

        if (type === 'income') {
            const result: IncomeReturnObjectType = await IncomeService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            this.categories = result.category as IncomeCategoryType[];
            this.categories.forEach((item: IncomeCategoryType) => {
                const option: HTMLOptionElement = document.createElement('option');
                if(item.id && item.title){
                    option.value = item.id.toString();
                    option.innerText = item.title;
                }

                this.categorySelect.appendChild(option);
            })
        }

        if (type === 'expense') {
            const result: ExpenseReturnObjectType = await ExpensesService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            this.categories = result.category as ExpenseCategoryType[];
            this.categories.forEach((item: ExpenseCategoryType) => {
                const option: HTMLOptionElement = document.createElement('option');
                if(item.id && item.title) {
                    option.value = item.id.toString();
                    option.innerText = item.title;
                    this.categorySelect.appendChild(option);
                }
            })
        }
    }

    private async editOperation(): Promise<void> {
        let categoryIdValue: string = this.categorySelect.value;
        let numberCategoryId: number = parseInt(categoryIdValue);

        let categorySumValue: string = this.sum.value;
        let numberAmount: number = parseInt(categorySumValue);

        let data: IncomeExpensesAddBodyType = {
            type: this.type.value,
            amount: numberAmount,
            date: this.date.value,
            comment: this.comment.value,
            category_id: numberCategoryId
        }

        let result: OperationReturnObjectType = await OperationsService.editOperation(this.id, data);
        if (result.error) {
            console.log(result.error);
            return;
        }
        return this.openNewRoute('/income-expenses');
    }
}
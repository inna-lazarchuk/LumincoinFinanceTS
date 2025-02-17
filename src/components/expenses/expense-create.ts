import {ExpensesService} from "../../services/expenses-service";
import {ExpenseReturnObjectType} from "../../types/expensesService.type";

export class ExpenseCreate {
    private openNewRoute: (url: string) => Promise<void>;
    private buttonCancelElement: HTMLElement | null;
    private buttonCreateElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.buttonCancelElement = document.getElementById('expense-cancel');
        this.buttonCreateElement = document.getElementById('expense-create');
        if(this.buttonCreateElement){
            this.buttonCreateElement.addEventListener('click', this.createCategory.bind(this));
        }
        if(this.buttonCancelElement){
            this.buttonCancelElement.addEventListener('click', () => this.openNewRoute('/expenses'));
        }
    }

    private async createCategory(e: Event): Promise<void> {
        e.preventDefault();
        const titleCategory: HTMLInputElement = document.getElementById('nameCategoryIncome') as HTMLInputElement;
        const result: ExpenseReturnObjectType = await ExpensesService.createCategory(titleCategory.value);
        if (result.error) {
            console.log("Ошибка при создании новой категории расхода");
            return;
        }
       return this.openNewRoute('/expenses');
    }
}
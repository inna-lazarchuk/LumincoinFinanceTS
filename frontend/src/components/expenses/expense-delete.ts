import {ExpensesService} from "../../services/expenses-service";

export class ExpenseDelete {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number | null;
    readonly buttonYesElement: HTMLElement | null;
    readonly buttonNoElement: HTMLElement | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = null;
        if (localStorage.getItem('categoryId')) {
            this.id = parseInt(localStorage.getItem('categoryId') as string);
        }

        this.buttonYesElement = document.getElementById('buttonYesE');
        this.buttonNoElement = document.getElementById('buttonNoE');

        if (this.buttonYesElement) {
            this.buttonYesElement.addEventListener('click', this.deleteFunction.bind(this));
        }
        if (this.buttonNoElement) {
            this.buttonNoElement.addEventListener('click', () => {
                localStorage.removeItem('categoryId');
                this.openNewRoute('/expenses');
            });
        }
    }

    private async deleteFunction(): Promise<void> {
        const successDelete: boolean = await ExpensesService.deleteExpenseCategory(this.id as number);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

        return this.openNewRoute('/expenses');
    }
}
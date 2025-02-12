import {OperationsService} from "../../services/operations-service";

export class IncomeExpenseDelete {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number;
    readonly buttonYesElement: HTMLElement | null;
    readonly buttonNoElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.id = parseInt(localStorage.getItem('operationId') as string);
        this.openNewRoute = openNewRoute;
        this.buttonYesElement = document.getElementById('buttonYes');
        this.buttonNoElement = document.getElementById('buttonNo');

        if (this.buttonYesElement) {
            this.buttonYesElement.addEventListener('click', this.deleteFunction.bind(this))
        }
        if (this.buttonNoElement) {
            this.buttonNoElement.addEventListener('click', () => this.openNewRoute('/income-expenses'))
        }
    }

    private async deleteFunction(): Promise<void> {
        const successDelete: boolean = await OperationsService.deleteIncomeExpenseCategory(this.id);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

        localStorage.removeItem('operationId');
        return this.openNewRoute('/income-expenses');
    }
}
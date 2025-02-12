import {IncomeService} from "../../services/income-service";

export class IncomeDelete {
    private openNewRoute: (url: string) => Promise<void>;
    readonly id: number;
    readonly buttonYesElement: HTMLElement | null;
    readonly buttonNoElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = parseInt(localStorage.getItem('categoryId') as string);

        this.buttonYesElement = document.getElementById('buttonYes');
        this.buttonNoElement = document.getElementById('buttonNo');

        if (this.buttonYesElement) {
            this.buttonYesElement.addEventListener('click', this.deleteFunction.bind(this));
        }
        if (this.buttonNoElement) {
            this.buttonNoElement.addEventListener('click', () => {
                localStorage.removeItem('categoryId');
                this.openNewRoute('/income');
            });
        }
    }

    private async deleteFunction(): Promise<void> {
        const successDelete: boolean = await IncomeService.deleteIncomeCategory(this.id);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

       return this.openNewRoute('/income');
    }
}
import {IncomeService} from "../../services/income-service";
import {IncomeReturnObjectType} from "../../types/incomeService.type";

export class IncomeCreate {
    private openNewRoute: (url: string) => Promise<void>;
    readonly buttonCancelElement: HTMLElement | null;
    readonly buttonCreateElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.buttonCancelElement = document.getElementById('income-cancel');
        this.buttonCreateElement = document.getElementById('income-create');
        if(this.buttonCreateElement){
            this.buttonCreateElement.addEventListener('click', this.createCategory.bind(this));
        }
        if(this.buttonCancelElement){
            this.buttonCancelElement.addEventListener('click', () => this.openNewRoute('/income'));
        }
    }

    private async createCategory(e: Event): Promise<void> {
        e.preventDefault();
        const titleCategory: HTMLInputElement = document.getElementById('nameCategoryIncome') as HTMLInputElement;
        const result: IncomeReturnObjectType = await IncomeService.createCategory(titleCategory.value);
        if (result.error) {
            console.log("Ошибка при создании новой категории дохода");
            return;
        }
       return this.openNewRoute('/income');
    }
}
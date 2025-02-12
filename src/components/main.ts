import {Chart} from "chart.js/auto";
import {OperationsService} from "../services/operations-service";
import {
    OperationResponseType,
    OperationsResponseBodyType,
    OperationsReturnObjectType,
    OperationsServiceType
} from "../types/operationsService.type";
import {DataForDiagramsType} from "../types/main.type";
import {PeriodForButtonEnum} from "../types/periodForButton.enum";
import {ChartConfiguration, ChartConfigurationCustomTypesPerDataset} from "chart.js/dist/types";

export class Main {
    private openNewRoute: (url: string) => Promise<void>;
    private buttonToday: HTMLElement | null;
    private buttonWeek: HTMLElement | null;
    private buttonMonth: HTMLElement | null;
    private buttonYear: HTMLElement | null;
    private buttonAll: HTMLElement | null;
    private buttonInterval: HTMLElement | null;
    private dateFrom: HTMLInputElement;
    private dateTo: HTMLInputElement;
    private allOperations: OperationsServiceType[] | null;
    private dataIncome: {};
    private dataExpenses: {};
    private labelsIncome: [] | string[] | null;
    private amountsIncome: [] | number[] | null;
    private labelsExpenses: [] | string[] | null;
    private amountsExpenses: [] | number[] | null;
    private diagramIncome: Chart | null;
    private diagramExpenses: Chart | null;
    private income: DataForDiagramsType[] | [];
    private expenses: DataForDiagramsType[] | [];

    constructor(openNewRoute :(url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.buttonToday = document.getElementById('buttonToday');
        this.buttonWeek = document.getElementById('buttonWeek');
        this.buttonMonth = document.getElementById('buttonMonth');
        this.buttonYear = document.getElementById('buttonYear');
        this.buttonAll = document.getElementById('buttonAll');
        this.buttonInterval = document.getElementById('buttonInterval');
        this.dateFrom = document.getElementById('inputFrom') as HTMLInputElement;
        this.dateTo = document.getElementById('inputTo') as HTMLInputElement;

        this.buttonAction().then();
        this.getAllOperations('day').then();

        this.allOperations = null;
        this.dataIncome = {};
        this.dataExpenses = {};
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.diagramIncome = null;
        this.diagramExpenses = null;
        this.income = [];
        this.expenses = [];
    }

    private async buttonAction(): Promise<void> {
        (this.buttonToday as HTMLElement).addEventListener('click', () => {
            this.getAllOperations(PeriodForButtonEnum.day);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if(this.buttonToday){
                this.buttonToday.classList.add('active');
            }
        });

        (this.buttonWeek as HTMLElement).addEventListener('click', () => {
            this.getAllOperations(PeriodForButtonEnum.week);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if(this.buttonWeek){
                this.buttonWeek.classList.add('active');
            }
        });

        (this.buttonMonth as HTMLElement).addEventListener('click', () => {
            this.getAllOperations(PeriodForButtonEnum.month);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if(this.buttonMonth){
                this.buttonMonth.classList.add('active');
            }
        });

        (this.buttonYear as HTMLElement).addEventListener('click', () => {
            this.getAllOperations(PeriodForButtonEnum.year);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if(this.buttonYear){
                this.buttonYear.classList.add('active');
            }
        });

        (this.buttonAll as HTMLElement).addEventListener('click', () => {
            this.getAllOperations(PeriodForButtonEnum.all);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if (this.buttonAll) {
                this.buttonAll.classList.add('active');
            }
        });

        (this.buttonInterval as HTMLElement).addEventListener('click', () => {
            let body: OperationsResponseBodyType = {
                dateFrom: this.dateFrom.value,
                dateTo: this.dateTo.value
            }
            this.getAllOperationsInterval(PeriodForButtonEnum.interval, body);
            document.querySelectorAll('.navigation-times .btn').forEach((button: Element) => {
                button.classList.remove('active');
            })
            if(this.buttonInterval){
                this.buttonInterval.classList.add('active');
            }
        });
    }

    private async getAllOperations(period: string): Promise<any> {
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.income = [];
        this.expenses = [];
        if (this.diagramIncome) {
            this.diagramIncome.destroy();
        }
        if (this.diagramExpenses) {
            this.diagramExpenses.destroy();
        }

        const result: OperationsReturnObjectType = await OperationsService.getAllOperationsPeriod(period);
        if (result.error) {
            console.log('Ошибка при получении данных');
            return this.openNewRoute('/');
        }

        if (result.allOperations && result.allOperations.length === 0) {
            console.log('Нет операций в выбранном периоде');
            return;
        }
        this.allOperations = result.allOperations;

        if (this.allOperations) {
            this.allOperations.forEach((operation: OperationResponseType) => {
                if (operation.type === 'income') {
                    if ((this.income as DataForDiagramsType[] | []).length === 0) {
                        (this.income as DataForDiagramsType[]).push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    } else {
                        let categoryAlreadyInIncome: DataForDiagramsType | undefined = (this.income as DataForDiagramsType[]).find((item: DataForDiagramsType) => item.category === operation.category);
                        if (categoryAlreadyInIncome) {
                            categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                        } else {
                            (this.income as DataForDiagramsType[]).push({
                                category: operation.category,
                                amount: +operation.amount
                            });
                        }
                    }
                }
                if (operation.type === 'expense') {

                    if ((this.expenses as DataForDiagramsType[] | []).length === 0) {
                        (this.expenses as DataForDiagramsType[]).push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    } else {
                        let categoryAlreadyInExpenses: DataForDiagramsType | undefined = (this.expenses as DataForDiagramsType[]).find((item: DataForDiagramsType) => item.category === operation.category);
                        if (categoryAlreadyInExpenses) {
                            categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                        } else {
                            (this.expenses as DataForDiagramsType[]).push({
                                category: operation.category,
                                amount: +operation.amount
                            });
                        }
                    }
                }
            });
        }

        this.income.forEach((income: DataForDiagramsType) => {
            (this.labelsIncome as string[]).push(income.category);
            (this.amountsIncome as number[]).push(income.amount);
        })

        this.expenses.forEach((expense: DataForDiagramsType) => {
            (this.labelsIncome as string[]).push(expense.category);
            (this.amountsIncome as number[]).push(expense.amount);
        })
        this.constructorDiagrams();
    }

    private async getAllOperationsInterval(period: string, body: OperationsResponseBodyType): Promise<any> {
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.income = [];
        this.expenses = [];
        if (this.diagramIncome) {
            this.diagramIncome.destroy();
        }
        if (this.diagramExpenses) {
            this.diagramExpenses.destroy();
        }

        const result: OperationsReturnObjectType = await OperationsService.getAllOperationsInterval(period, body);
        if (result.error) {
            console.log('Ошибка при получении данных');
            return this.openNewRoute('/')
        }

        if (result.allOperations && result.allOperations.length === 0) {
            console.log('Нет операций в выбранном периоде');
            return;
        }
        this.allOperations = result.allOperations;

        if (this.allOperations) {
            this.allOperations.forEach((operation: OperationResponseType) => {
                if (operation.type === 'income') {
                    if ((this.income as DataForDiagramsType[] | []).length === 0) {
                        (this.income as DataForDiagramsType[]).push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    } else {
                        let categoryAlreadyInIncome: DataForDiagramsType | undefined = (this.income as DataForDiagramsType[]).find((item: DataForDiagramsType) => item.category === operation.category);
                        if (categoryAlreadyInIncome) {
                            categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                        } else {
                            (this.income as DataForDiagramsType[]).push({
                                category: operation.category,
                                amount: +operation.amount
                            });
                        }
                    }
                }
                if (operation.type === 'expense') {

                    if ((this.expenses as DataForDiagramsType[] | []).length === 0) {
                        (this.expenses as DataForDiagramsType[]).push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    } else {
                        let categoryAlreadyInExpenses: DataForDiagramsType | undefined = (this.expenses as DataForDiagramsType[]).find((item: DataForDiagramsType) => item.category === operation.category);
                        if (categoryAlreadyInExpenses) {
                            categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                        } else {
                            (this.expenses as DataForDiagramsType[]).push({
                                category: operation.category,
                                amount: +operation.amount
                            });
                        }
                    }
                }
            });
        }
        this.income.forEach((income: DataForDiagramsType) => {
            (this.labelsIncome as string[]).push(income.category);
            (this.amountsIncome as number[]).push(income.amount);
        })

        this.expenses.forEach((expense: DataForDiagramsType) => {
            (this.labelsIncome as string[]).push(expense.category);
            (this.amountsIncome as number[]).push(expense.amount);
        })

        this.constructorDiagrams();
    }

    private constructorDiagrams(): void {
        const myDiagramIncomeCanvas: HTMLCanvasElement= document.getElementById('myDiagramIncome') as HTMLCanvasElement;
        const myDiagramExpensesCanvas: HTMLCanvasElement = document.getElementById('myDiagramExpenses') as HTMLCanvasElement;

        this.dataIncome = {
            labels: this.labelsIncome,
            datasets: [{
                label: 'Сумма, $',
                data: this.amountsIncome,
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD',
                ],
                hoverOffset: 4
            }]
        };
        this.diagramIncome = new Chart(myDiagramIncomeCanvas, {
            type: 'pie',
            data: this.dataIncome,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                }
            }
        } as  ChartConfiguration | ChartConfigurationCustomTypesPerDataset);

        this.dataExpenses = {
            labels: this.labelsExpenses,
            datasets: [{
                label: 'Сумма, $',
                data: this.amountsExpenses,
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD',
                ],
                hoverOffset: 4
            }]
        };

        this.diagramExpenses = new Chart(myDiagramExpensesCanvas, {
            type: 'pie',
            data: this.dataExpenses,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        } as  ChartConfiguration | ChartConfigurationCustomTypesPerDataset);
    }
}
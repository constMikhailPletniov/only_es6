import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { IResults, IObjArray } from './interfaces/interface';
import { domElements } from './domElements/domElements';
import './style/style.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("babel-core/register");
require("babel-polyfill");

Chart.register(...registerables);

let pageChart: Chart<"bar", number[], string | number>;
let dataApi: IResults;

const arrayObj: IObjArray = {
    jobsTitleArray: [],
}
const salarySet = new Set<number>();

document.addEventListener('DOMContentLoaded', getServerData);
domElements.selectorIdSelectData.addEventListener('change', changeChart);

function changeChart(e: Event) {
    pageChart.destroy();
    arrayObj.jobsTitleArray.length = 0;
    for (const item of (<HTMLSelectElement>e.target)) {
        if ((<HTMLOptionElement>item).selected) {
            getAllResults(dataApi, (<HTMLOptionElement>item).value);
        }
    }
}
export async function getServerData(): Promise<void> {
    try {
        const { data: { message } } = await axios.get('http://localhost:5000/data');
        dataApi = message;
        getAllResults(dataApi, 'specialities');
    } catch (err) {
        console.error('getServerData: ', err);
    }
}

export function getAllResults(results: IResults, optionValue: string): void {
    switch (true) {
        case (optionValue === 'specialities'):
            Object.values(results).map((element) => {

                arrayObj.jobsTitleArray.push(element.title);
                salarySet.add(element.salary_min);
                salarySet.add(element.salary_max);
            });
            break;
        case (optionValue === 'company'):
            Object.values(results).map((element) => {
                arrayObj.jobsTitleArray.push(element.company.display_name);
                salarySet.add(element.salary_min);
                salarySet.add(element.salary_max);
            });
            break;
        case (optionValue === 'category'):
            Object.values(results).map((element) => {
                arrayObj.jobsTitleArray.push(element.category.label);
                salarySet.add(element.salary_min);
                salarySet.add(element.salary_max);
            });
            break;
    }

    renderItems(arrayObj.jobsTitleArray, Array.from(salarySet), optionValue);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renderItems(jobsTitleArray: Array<string | number>, salarySet: Array<number>, optionValue: string): void {

    pageChart = new Chart((<HTMLCanvasElement><unknown>domElements.ctx), {
        type: 'bar',
        data: {
            labels: jobsTitleArray,
            datasets: [{
                label: `Salaries by ${optionValue}`,
                data: salarySet,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



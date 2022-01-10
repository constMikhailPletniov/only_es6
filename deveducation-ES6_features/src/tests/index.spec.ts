import mockAxios from './__mocks__/axios';
import mocksTest from './__mocks__/mocks.test';
import { getApiData } from '../ts';



describe('getApi function', async () => {
    test('Get request from api one time', async () => {
        mockAxios.mockImplementationOnce(() => Promise.resolve({ data: { results: [] } }));
        expect(await getApiData).toHaveBeenCalledTimes(1);
    });
});

describe('getAllResults function', () => {
    test('getAllResults', () => {
        const arrayObj: IObjArray = {
            jobsTitleArray: [],
        }
        const salarySet = new Set<number>();
        function getAllResults(results: IResults): void {

            Object.values(results).map((element, index) => {
                mocksTest();
                mocksTest();
                arrayObj.jobsTitleArray.push(element.title);
                salarySet.add(element.salary_min);
                salarySet.add(element.salary_max);
            });
            mocksTest(arrayObj.jobsTitleArray, Array.from(salarySet));
        }
        expect(getAllResults).toBeNull();
    });
});


describe('put to localStorage', () => {
    test('putDataToLocalStorage should be null', () => {
        function putDataToLocalStorage(index: string, value: string | number): void {

            localStorage.setItem(index.toString(), JSON.stringify(value));
        }
        expect(putDataToLocalStorage).toBeNull();
    });
});
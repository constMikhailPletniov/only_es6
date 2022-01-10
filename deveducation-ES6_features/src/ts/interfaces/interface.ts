
interface ICategory {
    label: string,
    tag: string,
    __CLASS__: string,
}

interface ICompany {
    display_name: string,
    __CLASS__: string,
}

interface ILocation {
    area: Array<string>,
    display_name: string,
    __CLASS__: string,
}

export interface IResults {
    adref: string,
    category: ICategory,
    company: ICompany,
    contract_time: string,
    contract_type: string,
    created: string,
    description: string,
    id: string,
    latitude: number,
    location: ILocation,
    longitude: number,
    redirect_url: string,
    salary_is_predicted: string,
    salary_max: number,
    salary_min: number,
    title: string,
    __CLASS__: string,

}

export interface ISalaryMax {
    salary_max: number
}

export interface IObjArray {
    jobsTitleArray: string[],
}

export interface ISelectorsCss {
    idSelectData: string,
    idMyChart: string,
}
interface IY {
    beginAtZero: boolean
}
interface IScales {
    y: IY
}
interface IOptions {
    scales: IScales,

}
interface IDatasets {
    label: string,
    data: Set<number>,
    backgroundColor: Array<string>,
    borderColor: Array<string>,
    borderWidth: number
}
export interface IData {
    labels: Array<string | number>,
    datasets: Array<IDatasets>,

}
export interface IConfig {
    type: string,
    data: IData,
    options: IOptions,
}

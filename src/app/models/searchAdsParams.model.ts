export class SearchAdsParamsModel{
    constructor(
        public offset:number,
        public limit:number,
        public title:string,
        public description:string,
        public address:string,
        public c_type: string,
        public sub_categories: string[],
        public expertises: string[],
        public agrements: string[]
    ){}
}
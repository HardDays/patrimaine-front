export class GetParamsModel{
    constructor(
        public user_id: number,
        public offset: number,
        public limit: number,
        public title: string,
        public description: string,
        public address: string,
        public c_type: string,
        public sub_category: number,
        public agrements: string[],
        public expertises: string[]
    ){}
}
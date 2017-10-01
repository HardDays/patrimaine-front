export class SearchUserParamsModel{
    constructor(
        public offset:number,
        public limit:number,
        public name:string,
        public address:string,
        public other_address:string,
        public email:string,
        public opening_times:number,
        public company_id:number,
        public c_type: string,
        public sub_categories: string[],
        public expertises: string[],
        public agrements: string[],
        public user_email:string,
        public user_name:string,
        public pcategory:string[]
    ){}
}
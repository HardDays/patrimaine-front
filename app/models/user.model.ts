import {CompanyModel} from './company.model';
export class UserModel{
    constructor(
        public id: number,
        public email:string, 
        public first_name: string,
        public last_name: string,
        public phone: string,
        public created_at: Date,
        public updated_at: Date,
        public company: CompanyModel
    ){}

}
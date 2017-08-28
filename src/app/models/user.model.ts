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
        public has_email_notifications:boolean,
        public pcategory:string,
        public company: CompanyModel
    ){
        /*if(first_name == null)
            this.first_name = "";
        if(last_name  == null)
            this.last_name = "";
        if(phone == null)
            this.phone = "";
        if(email == null)
            this.email = "";*/
        

    }

}
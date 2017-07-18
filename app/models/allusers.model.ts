import { UserModel } from './../models/user.model';
export class AllUsersModel{
    constructor(
        public users: UserModel[]
    ){}

}
export class ReviewModel{
    public constructor(
        public id?:number,
        public title?:string,
        public body?:string,
        public author?:string,
        public created_at?: Date,
        public updated_at?: Date,
        public user_id?:number
    ){

    }
}
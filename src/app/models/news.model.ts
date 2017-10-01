export class NewsModel{
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public user_id?: number,
        public created_at?: Date,
        public updated_at?: Date,
        public ncategory?:string,
        public ntype?:string,
        public links?:string,
        public subtitle?:string,
        public image_id?:number,
        public c_type?: string,
        public sub_category?: string,
        public agrements?: string[],
        public expertises?: string[],
        public user_first_name?:string,
        public user_last_name?:string

    ){}
}
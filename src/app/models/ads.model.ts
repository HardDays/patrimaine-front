export class AdsModel{
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public address?: string,
        public user_id?: number,
        public c_type_id?: number,
        public sub_category_id?: number,
        public created_at?: Date,
        public updated_at?: Date,
        public sub_category?: string,
        public agrements?: string[],
        public expertises?: string[]
    ){}
}
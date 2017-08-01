export class CompanyModel{
    constructor(
        public id: number,
            public name: string,
            public address: string,
            public other_address: string,
            public email: string,
            public phone: string,
            public opening_times: string,
            public company_id: string,
            public description: string,
            public links: string,
            public created_at: Date,
            public updated_at: Date,
            public image_id: number,
            public user_id: number,
            public sub_category_id: number,
            public c_type_id: number,
            public c_type: string,
            public sub_category: string,
            public agrements: string[],
            public expertises: string[]
    ){}
}
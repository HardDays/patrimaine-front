export class CompanyModel{
    constructor(
        public id: number,
            public name: string,
            public address: string,
            public other_address: string,
            public email: string,
            public phone: string,
            public opening_times: number,
            public company_id: number,
            public description: string,
            public links: string[],
            public created_at: Date,
            public updated_at: Date,
            public logo_file_name: string,
            public logo_content_type: string,
            public logo_file_size: number,
            public logo_updated_at: Date,
            public user_id: number,
            public sub_category_id: number,
            public c_type_id: number,
            public c_type: string,
            public sub_category: string,
            public agrements: string[],
            public expertises: string[]
    ){}
}
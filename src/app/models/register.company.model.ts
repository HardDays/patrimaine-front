export class RegisterCompanyModel{
    constructor(
        public name: string,
            public address: string,
            public other_address: string,
            public email: string,
            public phone: string,
            public opening_times: string,
            public description: string,
            public links: string,
            public c_type: string,
            public sub_category: string,
            public base64: string
    ){}
}

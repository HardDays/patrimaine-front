export class Base64ImageModel{
    constructor(
        public id: number,
        public base64: string,
        public create_at: Date,
        public updated_at: Date
    ){}
}
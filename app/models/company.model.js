"use strict";
var CompanyModel = (function () {
    function CompanyModel(id, name, address, other_address, email, phone, opening_times, company_id, description, links, created_at, updated_at, image_id, user_id, sub_category_id, c_type_id, c_type, sub_category, agrements, expertises, rate, likes) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.other_address = other_address;
        this.email = email;
        this.phone = phone;
        this.opening_times = opening_times;
        this.company_id = company_id;
        this.description = description;
        this.links = links;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image_id = image_id;
        this.user_id = user_id;
        this.sub_category_id = sub_category_id;
        this.c_type_id = c_type_id;
        this.c_type = c_type;
        this.sub_category = sub_category;
        this.agrements = agrements;
        this.expertises = expertises;
        this.rate = rate;
        this.likes = likes;
    }
    return CompanyModel;
}());
exports.CompanyModel = CompanyModel;
//# sourceMappingURL=company.model.js.map
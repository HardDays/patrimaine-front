"use strict";
var RegisterCompanyModel = (function () {
    function RegisterCompanyModel(name, address, other_address, email, phone, opening_times, description, links, c_type, sub_category, base64) {
        this.name = name;
        this.address = address;
        this.other_address = other_address;
        this.email = email;
        this.phone = phone;
        this.opening_times = opening_times;
        this.description = description;
        this.links = links;
        this.c_type = c_type;
        this.sub_category = sub_category;
        this.base64 = base64;
    }
    return RegisterCompanyModel;
}());
exports.RegisterCompanyModel = RegisterCompanyModel;
//# sourceMappingURL=register.company.model.js.map
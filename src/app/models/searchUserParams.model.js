"use strict";
var SearchUserParamsModel = (function () {
    function SearchUserParamsModel(offset, limit, name, address, other_address, email, opening_times, company_id, c_type, sub_categories, expertises, agrements, user_email, user_name) {
        this.offset = offset;
        this.limit = limit;
        this.name = name;
        this.address = address;
        this.other_address = other_address;
        this.email = email;
        this.opening_times = opening_times;
        this.company_id = company_id;
        this.c_type = c_type;
        this.sub_categories = sub_categories;
        this.expertises = expertises;
        this.agrements = agrements;
        this.user_email = user_email;
        this.user_name = user_name;
    }
    return SearchUserParamsModel;
}());
exports.SearchUserParamsModel = SearchUserParamsModel;
//# sourceMappingURL=searchUserParams.model.js.map
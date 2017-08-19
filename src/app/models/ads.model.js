"use strict";
var AdsModel = (function () {
    function AdsModel(id, title, description, address, user_id, c_type_id, sub_category_id, created_at, updated_at, sub_category, agrements, expertises) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.address = address;
        this.user_id = user_id;
        this.c_type_id = c_type_id;
        this.sub_category_id = sub_category_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.sub_category = sub_category;
        this.agrements = agrements;
        this.expertises = expertises;
    }
    return AdsModel;
}());
exports.AdsModel = AdsModel;
//# sourceMappingURL=ads.model.js.map
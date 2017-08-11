"use strict";
var GetParamsModel = (function () {
    function GetParamsModel(user_id, offset, limit, title, description, address, c_type, sub_category, agrements, expertises) {
        this.user_id = user_id;
        this.offset = offset;
        this.limit = limit;
        this.title = title;
        this.description = description;
        this.address = address;
        this.c_type = c_type;
        this.sub_category = sub_category;
        this.agrements = agrements;
        this.expertises = expertises;
    }
    return GetParamsModel;
}());
exports.GetParamsModel = GetParamsModel;
//# sourceMappingURL=getparams.model.js.map
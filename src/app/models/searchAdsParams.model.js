"use strict";
var SearchAdsParamsModel = (function () {
    function SearchAdsParamsModel(offset, limit, title, description, address, c_type, sub_categories, expertises, agrements) {
        this.offset = offset;
        this.limit = limit;
        this.title = title;
        this.description = description;
        this.address = address;
        this.c_type = c_type;
        this.sub_categories = sub_categories;
        this.expertises = expertises;
        this.agrements = agrements;
    }
    return SearchAdsParamsModel;
}());
exports.SearchAdsParamsModel = SearchAdsParamsModel;
//# sourceMappingURL=searchAdsParams.model.js.map
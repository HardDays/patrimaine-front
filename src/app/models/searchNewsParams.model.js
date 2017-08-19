"use strict";
var SearchNewsParamsModel = (function () {
    function SearchNewsParamsModel(offset, limit, title, description, c_type, sub_categories, expertises, agrements) {
        this.offset = offset;
        this.limit = limit;
        this.title = title;
        this.description = description;
        this.c_type = c_type;
        this.sub_categories = sub_categories;
        this.expertises = expertises;
        this.agrements = agrements;
    }
    return SearchNewsParamsModel;
}());
exports.SearchNewsParamsModel = SearchNewsParamsModel;
//# sourceMappingURL=searchNewsParams.model.js.map
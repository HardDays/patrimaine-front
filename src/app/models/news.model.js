"use strict";
var NewsModel = (function () {
    function NewsModel(id, title, description, user_id, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return NewsModel;
}());
exports.NewsModel = NewsModel;
//# sourceMappingURL=news.model.js.map
"use strict";
var index_1 = require("./index");
exports.routs = [
    { path: "ads", component: index_1.AdsComponent },
    { path: "users", component: index_1.UsersComponent },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "user_detail", component: index_1.UserDetailComponent },
    { path: "ads_detail", component: index_1.AdsDetailComponent }
];
//# sourceMappingURL=pages.route.js.map
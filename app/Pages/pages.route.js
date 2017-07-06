"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
exports.routs = [
    { path: "ads", component: index_1.AdsComponent },
    { path: "users", component: index_1.UsersComponent },
    { path: "users/:id", component: index_1.UserDetailComponent },
    { path: 'ads/:id', component: index_1.AdsDetailComponent },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "**", redirectTo: "/" }
];
//# sourceMappingURL=pages.route.js.map
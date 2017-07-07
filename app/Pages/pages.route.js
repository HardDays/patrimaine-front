"use strict";
var index_1 = require("./index");
exports.routs = [
    { path: "ads", component: index_1.AdsComponent },
    { path: "users", component: index_1.UsersComponent },
    { path: "users/:id", component: index_1.UserDetailComponent },
    { path: 'ads/:id', component: index_1.AdsDetailComponent },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "**", redirectTo: "/" }
];
//# sourceMappingURL=pages.route.js.map
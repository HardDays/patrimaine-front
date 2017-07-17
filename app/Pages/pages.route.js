"use strict";
var index_1 = require("./index");
exports.routs = [
    { path: "ads", component: index_1.AdsComponent },
    { path: "users", component: index_1.UsersComponent },
    { path: "users/:id", component: index_1.UserDetailComponent },
    { path: 'ads/:id', component: index_1.AdsDetailComponent },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'my_ads', component: index_1.MyAdsComponent },
    { path: 'create_ad', component: index_1.CreateAdComponent },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "401", component: index_1.UnauthorizedComponent },
    { path: "404", component: index_1.NotFoundComponent },
    { path: "**", component: index_1.NotFoundComponent }
];
//# sourceMappingURL=pages.route.js.map
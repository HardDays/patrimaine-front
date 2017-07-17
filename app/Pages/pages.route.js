"use strict";
var index_1 = require("./index");
var page_guards_1 = require("./page.guards");
exports.routs = [
    { path: "ads", component: index_1.AdsComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "users", component: index_1.UsersComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "users/:id", component: index_1.UserDetailComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'ads/:id', component: index_1.AdsDetailComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'my_ads', component: index_1.MyAdsComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'create_ad', component: index_1.CreateAdComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "401", component: index_1.UnauthorizedComponent },
    { path: "404", component: index_1.NotFoundComponent },
    { path: "**", component: index_1.NotFoundComponent }
];
//# sourceMappingURL=pages.route.js.map
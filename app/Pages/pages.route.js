"use strict";
var index_1 = require("./index");
var page_guards_1 = require("./page.guards");
var news_component_1 = require("./news/news.component");
var newsDetail_components_1 = require("./newsDetail/newsDetail.components");
exports.routs = [
    { path: "ad_list", component: index_1.AdsComponent, name: 'ad_list', canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'ads/:id', component: index_1.AdsDetailComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "users", component: index_1.UsersComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "users/:id", component: index_1.UserDetailComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'my_ads', component: index_1.MyAdsComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'create_ad', component: index_1.CreateAdComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'news_list', component: news_component_1.NewsComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: 'news/:id', component: newsDetail_components_1.NewsDetailComponent, canActivate: [page_guards_1.PageAccessGuard] },
    { path: "", pathMatch: "full", component: index_1.IndexComponent },
    { path: "401", component: index_1.UnauthorizedComponent },
    { path: "404", component: index_1.NotFoundComponent },
    { path: "**", component: index_1.NotFoundComponent }
];
//# sourceMappingURL=pages.route.js.map
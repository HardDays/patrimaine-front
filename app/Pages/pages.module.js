"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_service_1 = require("../services/http.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var index_1 = require("./index");
var page_guards_1 = require("./page.guards");
var news_component_1 = require("./news/news.component");
var newsDetail_components_1 = require("./newsDetail/newsDetail.components");
var PageModule = (function () {
    function PageModule() {
    }
    return PageModule;
}());
PageModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, router_1.RouterModule],
        declarations: [
            index_1.AdsComponent, index_1.IndexComponent, index_1.UsersComponent,
            index_1.AdsDetailComponent, index_1.UserDetailComponent, index_1.LoginComponent,
            index_1.RegisterComponent, index_1.CreateAdComponent, index_1.MyAdsComponent,
            index_1.UnauthorizedComponent, index_1.NotFoundComponent, news_component_1.NewsComponent,
            newsDetail_components_1.NewsDetailComponent
        ],
        exports: [
            index_1.AdsComponent, index_1.IndexComponent, index_1.UsersComponent,
            index_1.AdsDetailComponent, index_1.UserDetailComponent, index_1.LoginComponent,
            index_1.RegisterComponent, index_1.CreateAdComponent, index_1.MyAdsComponent,
            index_1.UnauthorizedComponent, index_1.NotFoundComponent, news_component_1.NewsComponent,
            newsDetail_components_1.NewsDetailComponent
        ],
        providers: [http_service_1.HttpService, page_guards_1.PageAccessGuard]
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=pages.module.js.map
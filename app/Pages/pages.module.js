"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_service_1 = require("../services/http.service");
var index_1 = require("./index");
var PageModule = (function () {
    function PageModule() {
    }
    return PageModule;
}());
PageModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [index_1.AdsComponent, index_1.IndexComponent, index_1.UsersComponent, index_1.AdsDetailComponent, index_1.UserDetailComponent],
        exports: [index_1.AdsComponent, index_1.IndexComponent, index_1.UsersComponent, index_1.AdsDetailComponent, index_1.UserDetailComponent],
        providers: [http_service_1.HttpService]
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=pages.module.js.map
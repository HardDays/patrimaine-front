"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/Rx");
var Subject_1 = require("rxjs/Subject");
var MainService = (function () {
    function MainService(httpService) {
        this.httpService = httpService;
        this.onAuthChange$ = new Subject_1.Subject();
    }
    MainService.prototype.GetAllAds = function (params) {
        return this.httpService.GetData('/ads/all', params);
    };
    MainService.prototype.GetAdsById = function (id) {
        return this.httpService.GetData('/ads/info/' + id, "")
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService.prototype.CreateAd = function (title, desc) {
        var ad = { title: title, description: desc };
        var params = new URLSearchParams();
        params.set('ad', JSON.stringify(ad));
        return this.httpService.PostData('/ads/create', JSON.stringify(params))
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService.prototype.UpdateAd = function (id, title, desc) {
        var ad = { title: title, description: desc };
        var params = new URLSearchParams();
        params.set('ad', JSON.stringify(ad));
        return this.httpService.PutData('/ads/update/' + id, JSON.stringify(params))
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService.prototype.GetAllUsers = function (params) {
        /*return this.httpService.GetData('/users/all',params).toArray<UserModel>();*/
        return this.httpService.GetData('/users/all', params);
    };
    MainService.prototype.GetUserById = function (id) {
        return this.httpService.GetData('/users/info/' + id, "");
    };
    MainService.prototype.GetMe = function () {
        return this.httpService.GetData('/users/my_info', "");
    };
    MainService.prototype.CreateUser = function (user) {
        var params = {
            user: user,
            expertises: ["placement"],
            agrements: ["CJA"]
        };
        console.log(JSON.stringify(params));
        return this.httpService.PostData('/users/create', JSON.stringify(params)).toPromise();
    };
    MainService.prototype.UpdateUser = function (user) {
        return this.httpService.PutData('/users/update', JSON.stringify(user)).toPromise();
    };
    MainService.prototype.UserLogin = function (email, password) {
        var _this = this;
        return this.httpService.Login(email, password)
            .add(function (data) {
            _this.onAuthChange$.next(true);
        });
    };
    return MainService;
}());
MainService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map
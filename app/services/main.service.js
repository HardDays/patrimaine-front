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
var ads_model_1 = require("./../models/ads.model");
var http_service_1 = require("./http.service");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/Rx");
var Subject_1 = require("rxjs/Subject");
var Ads = [
    new ads_model_1.AdsModel(1, "Test1", "Test1Test1", "", 25, 1, 1, null, null, "toutes", [""], [""]),
    new ads_model_1.AdsModel(2, "Test2", "Test2Test2", "", 25, 1, 1, null, null, "toutes", [""], [""]),
    new ads_model_1.AdsModel(3, "Test3", "Test3Test3", "", 25, 1, 1, null, null, "ecologique", [""], [""]),
    new ads_model_1.AdsModel(4, "Test4", "Test4Test4", "", 25, 1, 1, null, null, "finance", [""], [""]),
    new ads_model_1.AdsModel(5, "Test5", "Test5Test5", "", 25, 1, 1, null, null, "immobilier", [""], [""]),
    new ads_model_1.AdsModel(6, "Test6", "Test6Test6", "", 25, 1, 1, null, null, "plaisir", [""], [""]),
];
var AdsPromise = Promise.resolve(Ads);
var MainService = (function () {
    function MainService(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.onAuthChange$ = new Subject_1.Subject();
        this.onAuthChange$.next(false);
    }
    MainService.prototype.GetAllAds = function (text, category) {
        return AdsPromise
            .then(function (Ads) { return Ads.filter(function (x) { return x.description.includes(text) &&
            ((category.length > 0) ? (x.sub_category == category) : true); }); });
        //return this.httpService.GetData('/ads/all',params);
    };
    MainService.prototype.GetAdsById = function (id) {
        return AdsPromise
            .then(function (Ads) { return Ads.find(function (x) { return x.id == id; }); });
        /*return this.httpService.GetData('/ads/info/'+id,"")
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});*/
    };
    MainService.prototype.GetAllAdByUserId = function (id) {
        return AdsPromise
            .then(function (Ads) { return Ads.filter(function (x) { return x.user_id == id; }); });
    };
    MainService.prototype.CreateAd = function (title, desc) {
        var _this = this;
        var ad = { title: title, description: desc };
        var id = Ads.length;
        return AdsPromise
            .then(function (Ads) { return Ads.push(new ads_model_1.AdsModel(id + 1, title, desc, "", _this.me.id, 1, 1, null, null, "fintech", [""], [""])); });
        //let params = new URLSearchParams();
        //params.set('ad',JSON.stringify(ad));
        /*return this.httpService.PostData('/ads/create',JSON.stringify(params))
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});*/
    };
    MainService.prototype.DeleteAd = function (ad) {
        return AdsPromise
            .then(function (Ads) {
            var index = Ads.indexOf(ad, 0);
            if (index > -1)
                Ads.splice(index, 1);
        });
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
            _this.GetMe()
                .subscribe(function (user) {
                _this.me = user;
                _this.onAuthChange$.next(true);
                _this.router.navigate(["users", "me"]);
            });
        });
    };
    return MainService;
}());
MainService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService,
        router_1.Router])
], MainService);
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map
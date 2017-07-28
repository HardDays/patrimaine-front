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
var router_1 = require("@angular/router");
var http_service_1 = require("../../services/http.service");
var main_service_1 = require("./../../services/main.service");
var AdsComponent = (function () {
    function AdsComponent(router, mainService, params) {
        this.router = router;
        this.mainService = mainService;
        this.params = params;
        this.Category = "";
        this.IsLoading = true;
    }
    AdsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var category = this.params.params.forEach(function (params) {
            _this.Category = params["category"] ? params["category"] : "";
            _this.Page = params["page"] ? (params["page"]) : 1;
            _this.mainService
                .GetAllAds({ sub_category: _this.Category })
                .subscribe(function (data) {
                _this.Ads = data.ads;
                //this.AdsObservable = this.Ads.slice((this.Page-1)*10,(this.Page-1)*10+10);
                _this.mainService.GetAllAds({ sub_category: _this.Category, limit: 10, offset: ((_this.Page - 1) * 10) })
                    .subscribe(function (data) {
                    _this.AdsObservable = data.ads;
                    console.log("Page is " + _this.Page + ",offset:" + ((_this.Page - 1) * 10));
                    console.log(_this.AdsObservable);
                    _this.IsLoading = false;
                });
            });
        });
    };
    AdsComponent.prototype.SearchAdMyName = function (descr) {
        var _this = this;
        var params = {
            description: descr,
            sub_category: this.Category
        };
        this.mainService.GetAllAds({ description: descr, sub_category: this.Category })
            .subscribe(function (data) {
            _this.AdsObservable = data.ads;
            console.log(_this.Ads);
        });
    };
    return AdsComponent;
}());
AdsComponent = __decorate([
    core_1.Component({
        selector: "ads",
        templateUrl: "app/Pages/ads/ads.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        main_service_1.MainService,
        router_1.ActivatedRoute])
], AdsComponent);
exports.AdsComponent = AdsComponent;
//# sourceMappingURL=ads.component.js.map
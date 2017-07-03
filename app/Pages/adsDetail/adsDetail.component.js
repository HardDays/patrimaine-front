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
var main_service_1 = require("./../../services/main.service");
var AdsDetailComponent = (function () {
    function AdsDetailComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
    }
    AdsDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.activatedRoute.params.forEach(function (params) {
            var adId = params["id"];
            _this.service
                .GetAdsById(adId)
                .subscribe(function (data) { _this.Ads = data; });
        });
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
    };
    AdsDetailComponent.prototype.ngOnDestroy = function () {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.subscription.unsubscribe();
    };
    return AdsDetailComponent;
}());
AdsDetailComponent = __decorate([
    core_1.Component({
        selector: "ads",
        templateUrl: "app/Pages/adsDetail/adsDetail.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        main_service_1.MainService])
], AdsDetailComponent);
exports.AdsDetailComponent = AdsDetailComponent;
//# sourceMappingURL=adsDetail.component.js.map
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
    /*ExpertisesCheckboxes: CheckboxModel[] = [
        new CheckboxModel("Credit","credit",false),
        new CheckboxModel("Retraite","retraite",false),
        new CheckboxModel("Placement","placement",false),
        new CheckboxModel("Allocation","allocation",false),
        new CheckboxModel("Epargne","epargne",false),
        new CheckboxModel("Investissement","investissement",false),
        new CheckboxModel("Defiscalisation","defiscalisation",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Assurance","assurance",false),
        new CheckboxModel("Investissement plaisir","investissement_plaisir",false)
    ];
    AgrementsCheckboxes: CheckboxModel[] = [
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte_T","Carte_T",false)
    ];*/
    function AdsComponent(router, mainService, params) {
        this.router = router;
        this.mainService = mainService;
        this.params = params;
        this.Category = "";
    }
    AdsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var category = this.params.params.forEach(function (params) {
            _this.Category = params["category"] ? params["category"] : "";
            _this.mainService
                .GetAllAds({ sub_category: _this.Category })
                .subscribe(function (data) {
                _this.Ads = data.ads;
                console.log(_this.Ads);
            });
        });
    };
    AdsComponent.prototype.OnSelectAd = function (sel) {
        this.router.navigate(["ads", sel.id]);
    };
    AdsComponent.prototype.SearchAdMyName = function (descr) {
        var _this = this;
        var params = {
            description: descr,
            sub_category: this.Category
        };
        this.mainService.GetAllAds({ description: descr, sub_category: this.Category })
            .subscribe(function (data) {
            _this.Ads = data.ads;
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
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
var index_1 = require("./../index");
var main_service_1 = require("./../../services/main.service");
var searchAdsParams_model_1 = require("../../models/searchAdsParams.model");
var AdsComponent = (function () {
    function AdsComponent(router, mainService, params) {
        this.router = router;
        this.mainService = mainService;
        this.params = params;
        this.Category = "";
        this.Page = 1;
        this.Pages = [];
        this.Images = [];
        this.IsLoading = true;
        this.Params = new searchAdsParams_model_1.SearchAdsParamsModel(0, null, null, null, null, null, null, null, null);
        this.Expertises = [
            new index_1.CheckboxModel("Credit", "credit", false),
            new index_1.CheckboxModel("Retraite", "retraite", false),
            new index_1.CheckboxModel("Placement", "placement", false),
            new index_1.CheckboxModel("Allocation", "allocation", false),
            new index_1.CheckboxModel("Epargne", "epargne", false),
            new index_1.CheckboxModel("Investissement", "investissement", false),
            new index_1.CheckboxModel("Defiscalisation", "defiscalisation", false),
            new index_1.CheckboxModel("Immobilier", "immobilier", false),
            new index_1.CheckboxModel("Assurance", "assurance", false),
            new index_1.CheckboxModel("Investissement plaisir", "investissement_plaisir", false)
        ];
        this.Agreements = [
            new index_1.CheckboxModel("CJA", "CJA", false),
            new index_1.CheckboxModel("CIF", "CIF", false),
            new index_1.CheckboxModel("Courtier", "Courtier", false),
            new index_1.CheckboxModel("IOSB", "IOSB", false),
            new index_1.CheckboxModel("Carte-T", "Carte_T", false)
        ];
        this.Subcategory = [
            new index_1.CheckboxModel("Classique", "classique", false),
            new index_1.CheckboxModel("E-brooker", "e_brooker", false),
            new index_1.CheckboxModel("Fintech", "fintech", false),
            new index_1.CheckboxModel("Crowdfunding", "crowdfunding", false),
            new index_1.CheckboxModel("Lendfunding", "lendfunding", false),
            new index_1.CheckboxModel("Institutionnels", "institutionnels", false)
        ];
    }
    AdsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var category = this.params.params.forEach(function (params) {
            if (params["category"]) {
                _this.Params.sub_categories = [];
                _this.Params.sub_categories.push(params["category"]);
                _this.Subcategory = _this.mainService.GetCheckboxesFromChecked(_this.Params.sub_categories, _this.Subcategory);
            }
            _this.GetAllAds();
        });
    };
    AdsComponent.prototype.GetAllAds = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1) * 10;
        this.mainService.GetAllAds(this.Params)
            .subscribe(function (res) {
            console.log(res);
            _this.AdsObservable = res.ads;
            var i = 0;
            _this.Pages = [];
            while (i < res.total_count) {
                _this.Pages.push(i / 10 + 1);
                i += 10;
            }
            if (_this.Pages.length == 1)
                _this.Pages = [];
            _this.IsLoading = false;
        });
    };
    AdsComponent.prototype.OnSearchSubmit = function () {
        window.scrollTo(0, 0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        if (this.Params.address)
            this.Params.address = this.Params.address.toLowerCase();
        if (this.Params.description)
            this.Params.description = this.Params.description.toLowerCase();
        if (this.Params.title)
            this.Params.title = this.Params.title.toLowerCase();
        console.log(this.Params);
        this.GetAllAds();
    };
    AdsComponent.prototype.ChangePageNumber = function (page) {
        this.IsLoading = true;
        this.Page = page;
        this.GetAllAds();
    };
    AdsComponent.prototype.PrevOrNextPage = function (next) {
        this.IsLoading = true;
        this.Page += next ? 1 : -1;
        this.GetAllAds();
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
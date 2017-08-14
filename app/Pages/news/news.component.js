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
var checkbox_model_1 = require("../../models/checkbox.model");
var searchNewsParams_model_1 = require("../../models/searchNewsParams.model");
var NewsComponent = (function () {
    function NewsComponent(router, mainService, params) {
        this.router = router;
        this.mainService = mainService;
        this.params = params;
        this.Category = "";
        this.Page = 1;
        this.Pages = [];
        this.Images = [];
        this.IsLoading = true;
        this.Params = new searchNewsParams_model_1.SearchNewsParamsModel(0, null, null, null, null, null, null, null);
        this.Expertises = [
            new checkbox_model_1.CheckboxModel("Credit", "credit", false),
            new checkbox_model_1.CheckboxModel("Retraite", "retraite", false),
            new checkbox_model_1.CheckboxModel("Placement", "placement", false),
            new checkbox_model_1.CheckboxModel("Allocation", "allocation", false),
            new checkbox_model_1.CheckboxModel("Epargne", "epargne", false),
            new checkbox_model_1.CheckboxModel("Investissement", "investissement", false),
            new checkbox_model_1.CheckboxModel("Defiscalisation", "defiscalisation", false),
            new checkbox_model_1.CheckboxModel("Immobilier", "immobilier", false),
            new checkbox_model_1.CheckboxModel("Assurance", "assurance", false),
            new checkbox_model_1.CheckboxModel("Investissement plaisir", "investissement_plaisir", false)
        ];
        this.Agreements = [
            new checkbox_model_1.CheckboxModel("CJA", "CJA", false),
            new checkbox_model_1.CheckboxModel("CIF", "CIF", false),
            new checkbox_model_1.CheckboxModel("Courtier", "Courtier", false),
            new checkbox_model_1.CheckboxModel("IOSB", "IOSB", false),
            new checkbox_model_1.CheckboxModel("Carte-T", "Carte_T", false)
        ];
        this.Subcategory = [
            new checkbox_model_1.CheckboxModel("Classique", "classique", false),
            new checkbox_model_1.CheckboxModel("E-brooker", "e_brooker", false),
            new checkbox_model_1.CheckboxModel("Fintech", "fintech", false),
            new checkbox_model_1.CheckboxModel("Crowdfunding", "crowdfunding", false),
            new checkbox_model_1.CheckboxModel("Lendfunding", "lendfunding", false),
            new checkbox_model_1.CheckboxModel("Institutionnels", "institutionnels", false)
        ];
    }
    NewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var category = this.params.params.forEach(function (params) {
            if (params["category"]) {
                _this.Params.sub_categories = [];
                _this.Params.sub_categories.push(params["category"]);
                _this.Subcategory = _this.mainService.GetCheckboxesFromChecked(_this.Params.sub_categories, _this.Subcategory);
            }
            _this.GetAllNews();
        });
    };
    NewsComponent.prototype.GetAllNews = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1) * 10;
        this.mainService.GetAllNews(this.Params)
            .subscribe(function (res) {
            console.log(res);
            _this.News = res.news;
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
    NewsComponent.prototype.OnSearchSubmit = function () {
        window.scrollTo(0, 0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        if (this.Params.description)
            this.Params.description = this.Params.description.toLowerCase();
        if (this.Params.title)
            this.Params.title = this.Params.title.toLowerCase();
        console.log(this.Params);
        this.GetAllNews();
    };
    NewsComponent.prototype.ChangePageNumber = function (page) {
        this.IsLoading = true;
        this.Page = page;
        this.GetAllNews();
    };
    NewsComponent.prototype.PrevOrNextPage = function (next) {
        this.IsLoading = true;
        this.Page += next ? 1 : -1;
        this.GetAllNews();
    };
    return NewsComponent;
}());
NewsComponent = __decorate([
    core_1.Component({
        selector: "news",
        templateUrl: "app/Pages/news/news.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        main_service_1.MainService,
        router_1.ActivatedRoute])
], NewsComponent);
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map
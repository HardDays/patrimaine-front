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
var searchUserParams_model_1 = require("../../models/searchUserParams.model");
var checkbox_model_1 = require("../../models/checkbox.model");
var UsersComponent = (function () {
    function UsersComponent(router, mainService, params) {
        this.router = router;
        this.mainService = mainService;
        this.params = params;
        this.Category = "";
        this.Page = 1;
        this.Pages = [];
        this.Images = [];
        this.IsLoading = true;
        this.Params = new searchUserParams_model_1.SearchUserParamsModel(0, null, null, null, null, null, null, null, null, null, null, null);
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
        this.ErrorMesages = [];
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.params.params.forEach(function (params) {
            _this.Category = params["category"] ? params["category"] : "";
            _this.Page = params["page"] ? (params["page"]) : 1;
            _this.GetUsers();
        });
    };
    UsersComponent.prototype.GetUsers = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.Params.limit = 10;
        this.Params.offset = (this.Page - 1) * 10;
        this.ErrorMesages = [];
        this.mainService.GetAllUsers(this.Params)
            .subscribe(function (res) {
            _this.UsersObservable = res.users;
            var i = 0;
            _this.Pages = [];
            console.log(res);
            while (i < res.total_count) {
                _this.Pages.push(i / 10 + 1);
                i += 10;
            }
            if (_this.Pages.length == 1)
                _this.Pages = [];
            else if (_this.Pages.length == 0)
                _this.IsLoading = false;
            var total = 0;
            var current = 0;
            var _loop_1 = function (item) {
                total += 1;
                if (item.company && item.company.image_id) {
                    _this.mainService.GetImageById(item.company.image_id)
                        .subscribe(function (result) {
                        _this.Images[item.id] = result.base64;
                        current += 1;
                        if (total == current)
                            _this.IsLoading = false;
                    });
                }
                else {
                    _this.Images[item.id] = "images/demo/patrimoineLogo.png";
                    current += 1;
                    if (total == current)
                        _this.IsLoading = false;
                }
            };
            for (var _i = 0, _a = _this.UsersObservable; _i < _a.length; _i++) {
                var item = _a[_i];
                _loop_1(item);
            }
        });
    };
    UsersComponent.prototype.OnSearchSubmit = function () {
        window.scrollTo(0, 0);
        this.IsLoading = true;
        this.Page = 1;
        this.Params.expertises = this.mainService.GetCheckedCheckboxes(this.Expertises);
        this.Params.agrements = this.mainService.GetCheckedCheckboxes(this.Agreements);
        this.Params.sub_categories = this.mainService.GetCheckedCheckboxes(this.Subcategory);
        if (this.Params.address)
            this.Params.address = this.Params.address.toLowerCase();
        if (this.Params.email)
            this.Params.email = this.Params.email.toLowerCase();
        if (this.Params.name)
            this.Params.name = this.Params.name.toLowerCase();
        console.log(this.Params);
        this.GetUsers();
    };
    UsersComponent.prototype.ChangePageNumber = function (page) {
        this.IsLoading = true;
        this.Page = page;
        this.GetUsers();
    };
    UsersComponent.prototype.PrevOrNextPage = function (next) {
        this.IsLoading = true;
        this.Page += next ? 1 : -1;
        this.GetUsers();
    };
    UsersComponent.prototype.RateUser = function (id, conc, event) {
        var _this = this;
        this.ErrorMesages = [];
        var fullWidth = event.toElement.clientWidth;
        var posX = event.offsetX;
        var rate = 5 * posX / fullWidth;
        this.mainService.RateUser(id, rate)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 409) {
                _this.ErrorMesages[id] = "Already voted";
            }
            console.log(_this.ErrorMesages);
            //this.DisplayError(err);
        }, function () {
            //console.log("finished");
        });
    };
    UsersComponent.prototype.LikeUser = function (id) {
        var _this = this;
        this.mainService.LikeUser(id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 409) {
                _this.mainService.UnlikeUser(id)
                    .subscribe(function (result) {
                    _this.RefreshUserData(result);
                });
            }
        }, function () {
            //console.log("finished");
        });
    };
    UsersComponent.prototype.UnrateUser = function (id) {
        var _this = this;
        this.ErrorMesages = [];
        this.mainService.UnrateUser(id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 404) {
                _this.ErrorMesages[id] = "Cant cancel vote";
            }
        }, function () {
            //console.log("finished");
        });
    };
    UsersComponent.prototype.DisplayError = function (err) {
        if (err.status == 409) {
        }
    };
    UsersComponent.prototype.RefreshUserData = function (user) {
        var findUser = this.UsersObservable.find(function (x) { return x.id == user.id; });
        var index = this.UsersObservable.indexOf(findUser);
        this.UsersObservable[index] = user;
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        selector: "users",
        templateUrl: "app/Pages/users/users.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        main_service_1.MainService,
        router_1.ActivatedRoute])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map
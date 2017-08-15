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
var user_model_1 = require("../../models/user.model");
var checkbox_model_1 = require("../../models/checkbox.model");
var UserDetailComponent = (function () {
    function UserDetailComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.User = new user_model_1.UserModel(null, "", "", "", "", null, null, null);
        this.ImageBase64 = null;
        this.isMe = false;
        this.IsLoading = true;
        this.ErrorMesage = "";
        this.IsLiked = false;
        this.IsRated = 0;
        this.ExpertisesCB = [
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
        this.AgreementsCB = [
            new checkbox_model_1.CheckboxModel("CJA", "CJA", false),
            new checkbox_model_1.CheckboxModel("CIF", "CIF", false),
            new checkbox_model_1.CheckboxModel("Courtier", "Courtier", false),
            new checkbox_model_1.CheckboxModel("IOSB", "IOSB", false),
            new checkbox_model_1.CheckboxModel("Carte-T", "Carte_T", false)
        ];
        this.SubcategoryCB = [
            new checkbox_model_1.CheckboxModel("Classique", "classique", false),
            new checkbox_model_1.CheckboxModel("E-brooker", "e_brooker", false),
            new checkbox_model_1.CheckboxModel("Fintech", "fintech", false),
            new checkbox_model_1.CheckboxModel("Crowdfunding", "crowdfunding", false),
            new checkbox_model_1.CheckboxModel("Lendfunding", "lendfunding", false),
            new checkbox_model_1.CheckboxModel("Institutionnels", "institutionnels", false)
        ];
        this.Agreements = [];
        this.Expertises = [];
        this.SubCategory = [];
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.forEach(function (params) {
            var userId = params["id"];
            console.log(userId);
            //TODO: REWRITE THIS HARDCODE
            if (userId == 'me') {
                _this.isMe = true;
                _this.service.GetMe()
                    .subscribe(function (data) {
                    if (data.id) {
                        _this.AfterGettingOfUserInfo(data);
                    }
                });
            }
            else {
                _this.service.GetUserById(userId)
                    .subscribe(function (data) {
                    _this.AfterGettingOfUserInfo(data);
                });
            }
        });
    };
    UserDetailComponent.prototype.AfterGettingOfUserInfo = function (user) {
        var _this = this;
        this.User = user;
        if (this.User.company) {
            this.Agreements = this.service.GetCheckboxNamesFromCheckboxModel(this.User.company.agrements, this.AgreementsCB);
            this.Expertises = this.service.GetCheckboxNamesFromCheckboxModel(this.User.company.expertises, this.ExpertisesCB);
            this.SubCategory = this.service.GetCheckboxNamesFromCheckboxModel([this.User.company.sub_category], this.SubcategoryCB);
            this.service.GetMyLikes()
                .subscribe(function (like_result) {
                var like = like_result.find(function (x) { return x.user_id == _this.User.id; });
                _this.IsLiked = like ? true : false;
                _this.service.GetMyRates()
                    .subscribe(function (rate_result) {
                    var rate = rate_result.find(function (x) { return x.user_id == _this.User.id; });
                    _this.IsRated = (rate) ? rate.rate : 0;
                });
            });
            if (this.User.company.image_id) {
                this.service.GetImageById(this.User.company.image_id)
                    .subscribe(function (result) {
                    _this.ImageBase64 = result.base64;
                    _this.IsLoading = false;
                });
            }
            else {
                this.ImageBase64 = "images/demo/patrimoineLogo.png";
                this.IsLoading = false;
            }
        }
        else {
            this.ImageBase64 = "images/demo/patrimoineLogo.png";
            this.IsLoading = false;
        }
    };
    UserDetailComponent.prototype.LikeOrUnlikeUser = function () {
        if (!this.IsLiked)
            this.LikeUser();
        else
            this.UnlikeUser();
    };
    UserDetailComponent.prototype.LikeUser = function () {
        var _this = this;
        this.service.LikeUser(this.User.id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
            _this.IsLiked = true;
        }, function (err) {
            if (err.status == 409) {
                _this.UnlikeUser();
            }
        }, function () {
        });
    };
    UserDetailComponent.prototype.UnlikeUser = function () {
        var _this = this;
        this.service.UnlikeUser(this.User.id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
            _this.IsLiked = false;
        }, function (err) {
            if (err.status == 409) {
                _this.LikeUser();
            }
        });
    };
    UserDetailComponent.prototype.RateOrUnrateUser = function (event) {
        if (this.IsRated < 1) {
            this.RateUser(event);
        }
        else
            this.UnrateUser();
    };
    UserDetailComponent.prototype.RateUser = function (event) {
        var _this = this;
        var fullWidth = event.toElement.clientWidth;
        var posX = event.offsetX;
        var rate = 4 * posX / fullWidth + 1;
        this.service.RateUser(this.User.id, rate)
            .subscribe(function (result) {
            _this.IsRated = rate;
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 409) {
            }
        }, function () {
        });
    };
    UserDetailComponent.prototype.UnrateUser = function () {
        var _this = this;
        this.service.UnrateUser(this.User.id)
            .subscribe(function (result) {
            _this.IsRated = 0;
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 404) {
            }
        }, function () {
        });
    };
    UserDetailComponent.prototype.DisplayError = function (err) {
        if (err.status == 409) {
        }
    };
    UserDetailComponent.prototype.RefreshUserData = function (user) {
        this.User = user;
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: "userDetail",
        templateUrl: "app/Pages/userDetail/userDetail.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        main_service_1.MainService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=userDetail.component.js.map
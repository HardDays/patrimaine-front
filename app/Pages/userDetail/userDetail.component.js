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
        console.log(this.User);
        if (this.User.company && this.User.company.image_id) {
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
    };
    UserDetailComponent.prototype.RateUser = function (id, conc, event) {
        var _this = this;
        this.ErrorMesage = "";
        var fullWidth = event.toElement.clientWidth;
        var posX = event.offsetX;
        var rate = 5 * posX / fullWidth;
        this.service.RateUser(id, rate)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 409) {
                _this.ErrorMesage = "Already voted";
            }
            console.log(_this.ErrorMesage);
            //this.DisplayError(err);
        }, function () {
            //console.log("finished");
        });
    };
    UserDetailComponent.prototype.LikeUser = function (id) {
        var _this = this;
        this.service.LikeUser(id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 409) {
                _this.service.UnlikeUser(id)
                    .subscribe(function (result) {
                    _this.RefreshUserData(result);
                });
            }
        }, function () {
            //console.log("finished");
        });
    };
    UserDetailComponent.prototype.UnrateUser = function (id) {
        var _this = this;
        this.ErrorMesage = "";
        this.service.UnrateUser(id)
            .subscribe(function (result) {
            _this.RefreshUserData(result);
        }, function (err) {
            if (err.status == 404) {
                _this.ErrorMesage = "Cant cancel vote";
            }
        }, function () {
            //console.log("finished");
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
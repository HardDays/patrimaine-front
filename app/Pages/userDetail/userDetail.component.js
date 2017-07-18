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
var UserDetailComponent = (function () {
    function UserDetailComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.User = new index_1.UserModel(null, "", "", "", "", null, null, null);
        this.isMe = false;
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
                        _this.User = data;
                        console.log(_this.User);
                        _this.service.GetAllAdByUserId(data.id)
                            .then(function (Ads) {
                            _this.myAds = Ads;
                        });
                    }
                });
            }
            else {
                _this.service.GetUserById(userId)
                    .subscribe(function (data) {
                    _this.User = data;
                    console.log(_this.User);
                });
            }
        });
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
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
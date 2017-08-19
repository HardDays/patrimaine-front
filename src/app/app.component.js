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
var user_model_1 = require("./models/user.model");
var main_service_1 = require("./services/main.service");
var AppComponent = (function () {
    function AppComponent(router, mainService) {
        this.router = router;
        this.mainService = mainService;
        this.isLoggedIn = false;
        this.IsDropped = true;
        this.me = new user_model_1.UserModel(null, "", "", "", "", null, null, null);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mainService.onAuthChange$.subscribe(function (bool) {
            _this.isLoggedIn = bool;
            if (_this.isLoggedIn)
                _this.mainService.GetMe()
                    .subscribe(function (data) {
                    _this.me = data;
                });
        });
        this.mainService.TryToLoginWithToken();
    };
    AppComponent.prototype.Logout = function () {
        var _this = this;
        this.onMenuItemClick();
        this.mainService.Logout()
            .subscribe(function () { return _this.router.navigate(["/"]); }, function (err) { return _this.router.navigate(["/"]); }, function () { return _this.router.navigate(["/"]); });
    };
    //KASTIL', spasibo angularu za eto
    AppComponent.prototype.onMenuItemClick = function () {
        var _this = this;
        this.IsDropped = false;
        setTimeout(function () { return _this.IsDropped = true; }, 250);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'patrimoine',
        templateUrl: 'app/app.component.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        main_service_1.MainService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
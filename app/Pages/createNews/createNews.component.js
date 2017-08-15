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
var CreateNewsComponent = (function () {
    function CreateNewsComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.createError = false;
        this.isLoading = true;
        this.errorMsg = "";
    }
    CreateNewsComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
    };
    CreateNewsComponent.prototype.OncreateNewsButtonClick = function (title, description) {
        var _this = this;
        this.isLoading = true;
        this.service.CreateNews(title, description)
            .subscribe(function (result) {
            console.log("Result of creation: " + JSON.stringify(result));
            _this.router.navigate(['news', result.id]);
        }, function (err) {
            if (err.status == 401) {
                _this.errorMsg = "You have to be logged in! We will reddirect you to login page soon!";
                setTimeout(function () { return _this.router.navigate(["/login"]); }, 3000);
            }
            else {
                _this.errorMsg = "Something went wrong! Try again!";
            }
            _this.createError = true;
        });
    };
    return CreateNewsComponent;
}());
CreateNewsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "createNews",
        templateUrl: "./createNews.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        main_service_1.MainService])
], CreateNewsComponent);
exports.CreateNewsComponent = CreateNewsComponent;
//# sourceMappingURL=createNews.component.js.map
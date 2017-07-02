"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AdsDetailComponent = (function () {
    function AdsDetailComponent() {
        this.Ads = {
            Id: 1,
            Title: "Title",
            Description: "lol <br/> kek  cheburek",
            UserId: 1,
            SubCategory: "fintech",
            CreatedDate: new Date("2017-06-04T18:31:44.671Z")
        };
    }
    return AdsDetailComponent;
}());
AdsDetailComponent = __decorate([
    core_1.Component({
        selector: "ads",
        templateUrl: "app/Pages/adsDetail/adsDetail.component.html"
    })
], AdsDetailComponent);
exports.AdsDetailComponent = AdsDetailComponent;
//# sourceMappingURL=adsDetail.component.js.map
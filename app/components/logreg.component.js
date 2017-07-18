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
var user_model_1 = require("../models/user.model");
var LogRegComponent = (function () {
    function LogRegComponent() {
    }
    return LogRegComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LogRegComponent.prototype, "isLoggedIn", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.UserModel)
], LogRegComponent.prototype, "me", void 0);
LogRegComponent = __decorate([
    core_1.Component({
        selector: 'logreg-comp',
        template: "<div class=\"fl_center\">\n                    <a *ngIf=\"!isLoggedIn\" routerLink=\"/login\">Login</a> | <a routerLink=\"/register\">Register</a>\n                    <a *ngIf=\"isLoggedIn\" routerLink=\"/me\">{{me.first_name + \" \" + me.last_name}}</a>\n                </div>"
    })
], LogRegComponent);
exports.LogRegComponent = LogRegComponent;
//# sourceMappingURL=logreg.component.js.map
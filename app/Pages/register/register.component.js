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
var index_2 = require("./../index");
var main_service_1 = require("./../../services/main.service");
var checkbox_model_1 = require("../../models/checkbox.model");
var RegisterComponent = (function () {
    function RegisterComponent(router, mainService) {
        this.router = router;
        this.mainService = mainService;
        this.isOkEnabled = true;
        this.image = "";
        this.isLoading = false;
        this.regOk = false;
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
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.RegisterUser = function (email, password, fname, lname, phone) {
        var _this = this;
        window.scrollTo(0, 0);
        this.isLoading = true;
        var user = new index_1.RegisterUserModel(email, password, fname, lname, phone);
        console.log(JSON.stringify(user));
        this.mainService.CreateUser(user)
            .then(function (x) {
            _this.AfterRegistration(x);
        });
    };
    RegisterComponent.prototype.RegisterUserCompany = function (email, password, fname, lname, phone, cname, caddress, coaddress, cemail, cphone, worktime, description, links, c_type, subcategory) {
        var _this = this;
        window.scrollTo(0, 0);
        this.isLoading = true;
        var user = new index_1.RegisterUserModel(email, password, fname, lname, phone);
        var company = new index_2.RegisterCompanyModel(cname, caddress, coaddress, cemail, cphone, worktime, description, links, c_type, subcategory, this.image);
        console.log('AAAAAAAAAAAAAA');
        console.log(this.Expertises);
        console.log(JSON.stringify(user));
        this.mainService.CreateUserCompany(user, company, this.GetCheckedCheckboxes(this.Expertises), this.GetCheckedCheckboxes(this.Agreements))
            .then(function (x) {
            _this.AfterRegistration(x);
        });
    };
    RegisterComponent.prototype.changeListener = function ($event) {
        this.isOkEnabled = false;
        this.readThis($event.target);
    };
    RegisterComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.image = myReader.result;
            _this.isOkEnabled = true;
        };
        myReader.readAsDataURL(file);
    };
    RegisterComponent.prototype.AfterRegistration = function (user) {
        console.log(user);
        if (user && user.id) {
            this.isLoading = false;
            this.regOk = true;
        }
    };
    RegisterComponent.prototype.GetCheckedCheckboxes = function (input) {
        var result = [];
        var checked = input.filter(function (x) { return x.checked; });
        for (var _i = 0, checked_1 = checked; _i < checked_1.length; _i++) {
            var i = checked_1[_i];
            result.push(i.value);
        }
        console.log(result);
        return result;
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: "ads",
        templateUrl: "app/Pages/register/register.component.html",
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        main_service_1.MainService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map